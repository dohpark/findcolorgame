import styled from "styled-components";

interface BlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  backgroundColor: string;
  width: number;
}

const BlockContainer = styled.div<BlockProps>`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  margin: 2px;
`;

const Block: React.FC<BlockProps> = ({ backgroundColor, width, onClick }) => {
  return (
    <BlockContainer
      backgroundColor={backgroundColor}
      width={width}
      onClick={onClick}
    />
  );
};

export default Block;
