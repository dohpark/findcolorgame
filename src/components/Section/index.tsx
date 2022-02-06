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

const Section: React.FC<StageProps> = ({ stage, chooseAnswer }) => {
  const blockPerLine = Math.floor((stage + 3) / 2);
  const width = (WIDTH - 2 * MARGIN * blockPerLine) / blockPerLine;
  const arrayLength = blockPerLine ** 2;

  const [array, setArray] = useState(Array(arrayLength).fill(0));

  useEffect(() => {
    /**
     * 1. 정답과 오답 결정
     * 2. array에 바탕색상과 onClickHandler을 추가함.
     * ex. [{backgroundColor: "gray", onClickHandler: ()=> {}}, {backgroundColor: "red", onClickHandelr: () => {}}]
     * 3. 그 중 하나(랜덤으로 결정)는 정답 및 정답관련 onClickHandler을 추가함
     * 4. map으로 돌리며 backgroundColor와 onClickHandler을 각 Block에 넣음
     */
    setArray(Array(arrayLength).fill(0));
  }, [stage]);

  const colorAnswer = "gray";

  const arrayExample = [{ color: "white", width: 33, onClickHandler: {} }];

  return (
    <SectionContainer>
      {array.map((val, index) => (
        <Block
          backgroundColor={"gray"}
          width={width}
          onClick={() => {
            chooseAnswer.rightAnswer();
          }}
        />
      ))}
      <button
        onClick={() => {
          chooseAnswer.rightAnswer();
        }}
      >
        right
      </button>
      <button
        onClick={() => {
          chooseAnswer.wrongAnswer();
        }}
      >
        wrong
      </button>
    </SectionContainer>
  );
};

export default Section;
