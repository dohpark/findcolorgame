import styled from "styled-components";

interface SectionProps {
  sectionWidthHeight: number;
}

const SectionContainer = styled.div<SectionProps>`
  display: flex;
  flex-flow: row wrap;
  width: ${(props) => props.sectionWidthHeight}px;
  height: ${(props) => props.sectionWidthHeight}px;
  margin: 0;
  padding: 0;
`;

const Section: React.FC<SectionProps> = ({ sectionWidthHeight, children }) => {
  return (
    <SectionContainer sectionWidthHeight={sectionWidthHeight}>
      {children}
    </SectionContainer>
  );
};

export default Section;
