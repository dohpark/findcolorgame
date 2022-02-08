import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { randomAnswerGenerator, randomRGBGenerator } from "../../utils";
import Block from "../Block";

const WIDTH = 360;
const HEIGHT = 360;
const MARGIN = 2;

interface StageProps {
  stage: number;
  chooseAnswer: {
    rightAnswer: () => void;
    wrongAnswer: () => void;
  };
  timeLeft: number;
}
const SectionContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: 0;
  padding: 0;
`;

const Section: React.FC<StageProps> = ({ stage, chooseAnswer }) => {
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

  // 첫렌더링
  useEffect(() => {}, []);

  // time
  useEffect(() => {
    console.log(answer, `rgb: ${RGB.r}, ${RGB.g}, ${RGB.b}`);
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
  }, [RGB, answer, arrayLength, chooseAnswer, stage]);

  // stage
  useEffect(() => {
    const { arrayLength } = getBlockPerLine(stage);
    const { R, G, B } = randomRGBGenerator();
    setRGB({ r: R, g: G, b: B });
    setAnswer(randomAnswerGenerator(arrayLength));
  }, [stage]);

  return (
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
  );
};

export default Section;
