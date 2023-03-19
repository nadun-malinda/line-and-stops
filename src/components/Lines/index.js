import styled from "styled-components";
import { device } from "../../styles/mixins";
import Icon from "../icons";

const LineWrapper = styled.div`
  --list-item-display: block;
  --list-item-margin: 0;

  h3 {
    margin-bottom: 0.5rem;
  }
  h4 {
    margin-top: 0;
    font-weight: 300;
  }

  @media ${device.tablet} {
    grid-column: 1 / span 2;
    --list-item-display: inline-block;
    --list-item-margin: 0 0.125rem 0.125rem;
  }
`;

const LineList = styled.ul`
  --height: calc(100vh - 150px);
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: var(--height);
  overflow-y: auto;

  @media ${device.tablet} {
    display: flex;
    width: 100%;
    max-width: calc(100vw - 2rem);
    overflow-x: auto;
    padding-bottom: 0.5rem;
    --height: auto;
  }
`;

const Line = styled.li`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: var(--list-item-margin);
  background-color: ${(props) =>
    props.$active === true ? "#ccc" : "transparent"};

  &:not(:last-of-type) {
    margin-bottom: 0.125rem;
  }

  p {
    margin: 0;
  }

  &:hover {
    background-color: #ccc;
  }

  @media ${device.tablet} {
    min-width: 120px;
  }
`;

const LineInfo = styled.div`
  margin-left: 0.5rem;
`;

const Lines = ({ lines, activeLine, setActiveLine }) => {
  return (
    <LineWrapper>
      <div>
        <h3>Bus Lines</h3>
        <h4>Lines with most bus stops in descending order</h4>
        <LineList>
          {lines.length > 0
            ? lines.map((line) => (
                <Line
                  key={line.lineNumber}
                  onClick={() => setActiveLine(line.lineNumber)}
                  $active={line.lineNumber === activeLine}
                >
                  <Icon icon="Bus" width="22px" height="22px" />
                  <LineInfo>
                    <p>Line #{line.lineNumber}</p>
                    <small>{line.lineStopsCount} stops</small>
                  </LineInfo>
                </Line>
              ))
            : "No data to show"}
        </LineList>
      </div>
    </LineWrapper>
  );
};

export default Lines;
