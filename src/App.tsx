import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Block from "./components/Block";
import Header from "./components/Header";
import { randomAnswerGenerator, randomRGBGenerator } from "./utils";

const WIDTH = 360;
const HEIGHT = 360;
const MARGIN = 2;

const SectionContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: 0;
  padding: 0;
`;

const App: React.FC = () => {
  const TIME_LEFT_INIT = 15;
  const STAGE_INIT = 1;
  const SCORE_INIT = 0;

  const [stage, setStage] = useState(STAGE_INIT);
  const [score, setScore] = useState(SCORE_INIT);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT_INIT);

  const getBlockPerLine = (stage: number) => {
    const blockPerLine = Math.floor((stage + 3) / 2);
    const width = (WIDTH - 2 * MARGIN * blockPerLine) / blockPerLine;
    const arrayLength = blockPerLine ** 2;

    return { width, arrayLength };
  };

  const { width, arrayLength } = getBlockPerLine(stage);
  const [RGB, setRGB] = useState({ r: 0, g: 0, b: 0 });
  const [answer, setAnswer] = useState(0);
  const [array, setArray] = useState(Array(arrayLength).fill(0));

  // stage
  useEffect(() => {
    setTimeLeft(TIME_LEFT_INIT);
    const { arrayLength } = getBlockPerLine(stage);
    const { R, G, B } = randomRGBGenerator();
    setRGB({ r: R, g: G, b: B });
    setAnswer(randomAnswerGenerator(arrayLength));
  }, [stage]);

  // timeLeft
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft < -1111111111110) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(STAGE_INIT);
      setTimeLeft(TIME_LEFT_INIT);
      setScore(SCORE_INIT);
    }
    return () => clearInterval(id);
  }, [timeLeft, score, stage]);

  // chooseAnswer
  const chooseAnswer = {
    rightAnswer: () => {
      setScore(score + timeLeft * stage);
      setStage(stage + 1);
      setTimeLeft(TIME_LEFT_INIT);
    },
    wrongAnswer: () => {
      setTimeLeft(timeLeft - 3);
    },
  };

  useEffect(() => {
    const { arrayLength } = getBlockPerLine(stage);

    // array
    let arrayCandidate = Array(arrayLength).fill({
      backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`,
      onClickHandler: () => {
        chooseAnswer.wrongAnswer();
      },
    });

    arrayCandidate[answer] = {
      backgroundColor: "black",
      onClickHandler: () => {
        chooseAnswer.rightAnswer();
      },
    };

    setArray(arrayCandidate);
    console.log("time", answer);
  }, [RGB, stage, score, timeLeft]);

  /**
   *
   * 문제점
   * arraylength 변경할 때 이때 answer또한 고정되어 있어서
   * 변경할 때 전 answer이 같이 반영된 후에 변경 후의 answer이 반영됨.
   *
   * 해결방법
   * 1. 둘의 프로세스가 분리되어 있기 때문에 발생됨. 둘을 하나로 합치는 방법이 가장 최선
   */

  return (
    <>
      <Header stage={stage} timeLeft={timeLeft} score={score} />
      <SectionContainer>
        {array.map((val, index) => (
          <Block
            key={`${val.backgroundColor}${index}`}
            backgroundColor={val.backgroundColor}
            width={width}
            onClick={val.onClickHandler}
          />
        ))}
      </SectionContainer>
    </>
  );
};

export default App;
