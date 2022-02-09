import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Block from "./components/Block";
import Header from "./components/Header";
import { randomAnswerGenerator, randomRGBGenerator } from "./utils";

// 상수
const SECTION_WIDTH = 360;
const SECTION_HEIGHT = 360;
const BLOCK_MARGIN = 2;

const TIME_LEFT_INIT = 15;
const STAGE_INIT = 1;
const SCORE_INIT = 0;

const SectionContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: ${SECTION_WIDTH}px;
  height: ${SECTION_HEIGHT}px;
  margin: 0;
  padding: 0;
`;

const App: React.FC = () => {
  const [stage, setStage] = useState(STAGE_INIT);
  const [score, setScore] = useState(SCORE_INIT);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT_INIT);

  const getBlock = (stage: number) => {
    const blockPerLine = Math.floor((stage + 3) / 2);
    const width =
      (SECTION_WIDTH - 2 * BLOCK_MARGIN * blockPerLine) / blockPerLine;
    const arrayLength = blockPerLine ** 2;

    return { width, arrayLength };
  };

  const [block, setBlock] = useState({
    width: getBlock(stage).width,
    arrayLength: getBlock(stage).arrayLength,
  });
  const [RGB, setRGB] = useState({ r: 0, g: 0, b: 0 });
  const [answer, setAnswer] = useState(0);
  const [array, setArray] = useState(Array(block.arrayLength).fill(0));
  const [clicked, setClicked] = useState(false);

  // stage
  useEffect(() => {
    setBlock({
      width: getBlock(stage).width,
      arrayLength: getBlock(stage).arrayLength,
    });
    const { R, G, B } = randomRGBGenerator();
    setRGB({ r: R, g: G, b: B });
    setAnswer(randomAnswerGenerator(block.arrayLength));
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
  }, [timeLeft]);

  // array
  useEffect(() => {
    // chooseAnswer
    const chooseAnswer = {
      rightAnswer: () => {
        setStage(stage + 1);
        setScore(score + timeLeft * stage);
        setTimeLeft(TIME_LEFT_INIT);
      },
      wrongAnswer: () => {
        setTimeLeft(timeLeft - 3);
      },
    };

    // array
    let arrayCandidate = Array(block.arrayLength).fill({
      backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`,
      width: block.width,
      onClickHandler: () => {
        chooseAnswer.wrongAnswer();
      },
    });

    arrayCandidate[answer] = {
      backgroundColor: "black",
      width: block.width,
      onClickHandler: () => {
        chooseAnswer.rightAnswer();
      },
    };

    setArray(arrayCandidate);
    setClicked(true);
  }, [timeLeft]);

  // RGB, answer, block, score, stage, timeLeft, clicked

  /**
   *
   * 문제점
   * arraylength 변경할 때 이때 answer또한 고정되어 있어서
   * 변경할 때 전 answer이 같이 반영된 후에 변경 후의 answer이 반영됨.
   * 정답 클릭 => stage 변경 => arraylength 변경 => array 변경 (answer은 변경하지 않음) => answer변경
   *
   * 해결방법
   * 1. 둘의 프로세스가 분리되어 있기 때문에 발생됨. 둘을 하나로 합치는 방법이 가장 최선
   *
   * 진짜 문제점
   * arrayWidth와 width를 state로 관리하지 않아, 내 허락 없이 알아서 바뀌어서 생긴 문제임
   *
   * 두번째 문제점
   * 첫번째 렌더링 때 검은색 화면이 살짝 보인 후 바뀜
   *
   * 원인
   * 첫 렌더링 때 검정색으로 구성된 화면이 나오는데 이를 먼저 보여줘서 생기는 문제
   *
   * 해결방법 1
   * 1. 첫번째 렌더링부터 완벽하게 시작하게 만들기
   *
   * 해결방법 2
   * 첫번째 렌더링을 아예 안보이게 한 후 두번째 렌더링부터 보여주기
   *
   *
   */

  return (
    <>
      <Header stage={stage} timeLeft={timeLeft} score={score} />
      <SectionContainer>
        {array.map((val, index) => (
          <Block
            key={`${val.backgroundColor}${index}`}
            backgroundColor={val.backgroundColor}
            width={val.width}
            onClick={val.onClickHandler}
          />
        ))}
      </SectionContainer>
    </>
  );
};

export default App;
