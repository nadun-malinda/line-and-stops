import styled from "styled-components";
import { device } from "../../styles/mixins";
import Icon from "../icons";

const StopsWrapper = styled.div`
  h3 {
    margin-bottom: 0.5rem;
  }
  h4 {
    margin-top: 0;
    font-weight: 300;
  }

  @media ${device.tablet} {
    grid-column: 1 / span 2;
  }
`;

const Stop = styled.div`
  --height-top: 150px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  height: calc(100vh - var(--height-top));
  overflow-y: auto;
  padding: 1rem 0;

  @media ${device.laptopL} {
    grid-template-columns: auto auto auto;
  }

  @media ${device.laptop} {
    grid-template-columns: auto auto;
  }

  @media ${device.tablet} {
    grid-template-columns: auto auto;
  }

  @media ${device.mobile} {
    grid-template-columns: auto;
    --height-top: 320px;
  }
`;

const StopName = styled.div`
  display: flex;
  margin: 0 0.25rem 1rem 0;
  border-radius: 0.25rem;
  font-size: 0.825rem;
  position: relative;
`;

const Stops = ({ line }) => {
  return (
    <StopsWrapper>
      <h3>Bus Stops</h3>
      <h4>
        {line
          ? `There are ${line.lineStopsCount} stops in the Line #${line.lineNumber}`
          : "No data to show"}
      </h4>

      <Stop>
        {line?.stops?.map((stop, index) => (
          <StopName key={stop.id}>
            <Icon icon="Marker" />
            <span>
              <b>{stop.id}</b> {stop.name}
            </span>
          </StopName>
        ))}
      </Stop>
    </StopsWrapper>
  );
};

export default Stops;
