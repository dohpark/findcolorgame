import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Block from "./components/Block";
import Header from "./components/Header";
import { randomAnswerGenerator } from "./utils/randomAnswerGenerator";
import { randomRGBGenerator } from "./utils/randomRGBGenerator";

// 상수
const SECTION_WIDTH = 360;
const SECTION_HEIGHT = 360;
const BLOCK_MARGIN = 2;

const TIME_LEFT_INIT = 15;
const STAGE_INIT = 1;
const SCORE_INIT = 0;

// styled-components
const SectionContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: ${SECTION_WIDTH}px;
  height: ${SECTION_HEIGHT}px;
  margin: 0;
  padding: 0;
`;

// function component
const App: React.FC = () => {
  const [stage, setStage] = useState(STAGE_INIT);
  const [score, setScore] = useState(SCORE_INIT);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT_INIT);

  const getBlock = (stage: number) => {
    const blockPerLine = Math.floor((stage + 3) / 2);
    const RGB = randomRGBGenerator(stage);

    const width =
      (SECTION_WIDTH - 2 * BLOCK_MARGIN * blockPerLine) / blockPerLine;
    const arrayLength = blockPerLine ** 2;
    const backgroundColor = RGB.original;
    const answer = randomAnswerGenerator(arrayLength);
    const answerBackgroundColor = RGB.twist;

    return {
      width,
      arrayLength,
      backgroundColor,
      answer,
      answerBackgroundColor,
    };
  };

  const { width, arrayLength, backgroundColor, answer, answerBackgroundColor } =
    getBlock(stage);

  const [block, setBlock] = useState({
    width,
    arrayLength,
    backgroundColor,
    answer,
    answerBackgroundColor,
  });

  const createArray = useCallback(() => {
    // type
    type arrayType = {
      backgroundColor: string;
      width: number;
      onClickHandler: () => void;
    }[];

    // choose answer
    const chooseAnswer = {
      rightAnswer: () => {
        setStage(stage + 1);
        setScore(score + timeLeft * stage);
        setTimeLeft(TIME_LEFT_INIT);
      },
      wrongAnswer: () => {
        if (timeLeft < 3) setTimeLeft(0);
        else setTimeLeft(timeLeft - 3);
      },
    };

    // arrayCandidate
    let arrayCandidate: arrayType = Array(block.arrayLength).fill({
      backgroundColor: block.backgroundColor,
      width: block.width,
      onClickHandler: () => {
        chooseAnswer.wrongAnswer();
      },
    });

    arrayCandidate[block.answer] = {
      backgroundColor: block.answerBackgroundColor,
      width: block.width,
      onClickHandler: () => {
        chooseAnswer.rightAnswer();
      },
    };

    return arrayCandidate;
  }, [block, score, stage, timeLeft]);

  const [array, setArray] = useState(createArray());
  const [reset, setReset] = useState(false);

  // stage별 block 세팅
  useEffect(() => {
    if (stage > 1 || reset) {
      const {
        width,
        arrayLength,
        backgroundColor,
        answer,
        answerBackgroundColor,
      } = getBlock(stage);

      setBlock({
        width,
        arrayLength,
        backgroundColor,
        answer,
        answerBackgroundColor,
      });
      setReset(false);
    }
  }, [stage, reset]);

  // timeLeft 세팅
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft <= 0) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(STAGE_INIT);
      setTimeLeft(TIME_LEFT_INIT);
      setScore(SCORE_INIT);
      setReset(true);
    }
    return () => clearInterval(id);
  }, [timeLeft, score, stage]);

  // array 세팅
  useEffect(() => {
    setArray(createArray());
  }, [createArray]);

  return (
    <>
      <Header stage={stage} timeLeft={timeLeft} score={score} />
      <SectionContainer>
        {array.map((val, index) => (
          <Block
            key={`${val.backgroundColor}${index}`}
            backgroundColor={val.backgroundColor}
            width={val.width}
            onClick={() => {
              val.onClickHandler();
            }}
          />
        ))}
      </SectionContainer>
    </>
  );
};

export default App;
