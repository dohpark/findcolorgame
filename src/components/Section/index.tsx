import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
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
}
const SectionContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: 0;
  padding: 0;
`;

function mix(a: number, b: number, v: number) {
  return (1 - v) * a + v * b;
}

function HSVtoRGB(H: number, S: number, V: number) {
  const V2 = V * (1 - S);
  const r =
    (H >= 0 && H <= 60) || (H >= 300 && H <= 360)
      ? V
      : H >= 120 && H <= 240
      ? V2
      : H >= 60 && H <= 120
      ? mix(V, V2, (H - 60) / 60)
      : H >= 240 && H <= 300
      ? mix(V2, V, (H - 240) / 60)
      : 0;
  const g =
    H >= 60 && H <= 180
      ? V
      : H >= 240 && H <= 360
      ? V2
      : H >= 0 && H <= 60
      ? mix(V2, V, H / 60)
      : H >= 180 && H <= 240
      ? mix(V, V2, (H - 180) / 60)
      : 0;
  const b =
    H >= 0 && H <= 120
      ? V2
      : H >= 180 && H <= 300
      ? V
      : H >= 120 && H <= 180
      ? mix(V2, V, (H - 120) / 60)
      : H >= 300 && H <= 360
      ? mix(V, V2, (H - 300) / 60)
      : 0;

  return {
    R: Math.round(r * 255),
    G: Math.round(g * 255),
    B: Math.round(b * 255),
  };
}

const randomHSVGenerator = () => {
  const H = Math.floor(Math.random() * 360);
  const S = (Math.floor(Math.random() * 80) + 20) / 100;
  const V = (Math.floor(Math.random() * 30) + 70) / 100;
  return { H, S, V };
};

const randomAnswerGenerator = (length: number) => {
  return Math.floor(Math.random() * length);
};

const Section: React.FC<StageProps> = ({ stage, chooseAnswer }) => {
  const blockPerLine = Math.floor((stage + 3) / 2);
  const width = (WIDTH - 2 * MARGIN * blockPerLine) / blockPerLine;
  const [arrayLength, setArrayLength] = useState(blockPerLine ** 2);
  const [array, setArray] = useState(Array(arrayLength).fill(0));
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState(0);

  // stage
  useEffect(() => {
    const { H, S, V } = randomHSVGenerator();
    const { R, G, B } = HSVtoRGB(H, S, V);
    setR(R);
    setB(B);
    setG(G);
    setArrayLength(blockPerLine ** 2);
    setAnswer(randomAnswerGenerator(arrayLength));
  }, [stage]);

  // time
  useEffect(() => {
    console.log(answer, `rgb: ${r}, ${g}, ${b}`);
    let array = Array(arrayLength).fill({
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      onClickHandler: () => {
        chooseAnswer.wrongAnswer();
      },
    });

    array[answer] = {
      backgroundColor: "black",
      onClickHandler: () => {
        chooseAnswer.rightAnswer();
      },
    };

    setArray(array);
  }, [chooseAnswer, r, g, b]);

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
