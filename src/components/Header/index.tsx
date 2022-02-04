import styled from "styled-components";

const HeaderContainer = styled.div``;

interface HeaderProps {
  stage: number;
  timeLeft: number;
  score: number;
}

const Header: React.FC<HeaderProps> = ({ stage, timeLeft, score }) => {
  return (
    <HeaderContainer>
      <span>스테이지:{stage} </span>
      <span>남은시간: {timeLeft} </span>
      <span>점수: {score} </span>
    </HeaderContainer>
  );
};

export default Header;
