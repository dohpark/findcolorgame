import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Section from "./components/Section";

const App: React.FC = () => {
  const TIME_LEFT_INIT = 15;
  const STAGE_INIT = 1;
  const SCORE_INIT = 0;

  const [stage, setStage] = useState(STAGE_INIT);
  const [score, setScore] = useState(SCORE_INIT);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT_INIT);

  // stage
  useEffect(() => {
    setTimeLeft(TIME_LEFT_INIT);
  }, [stage]);

  // timeLeft
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft < 0) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(STAGE_INIT);
      setTimeLeft(TIME_LEFT_INIT);
      setScore(SCORE_INIT);
    }
    return () => clearInterval(id);
  }, [timeLeft]);

  // function
  const addScore = () => {
    setScore(score + timeLeft * stage);
  };
  const stageUp = () => {
    setStage(stage + 1);
    setTimeLeft(TIME_LEFT_INIT);
  };
  const wrongAnswer = () => {
    setTimeLeft(timeLeft - 3);
  };

  return (
    <>
      <Header stage={stage} timeLeft={timeLeft} score={score} />
      <Section stage={stage} />
    </>
  );
};

export default App;
