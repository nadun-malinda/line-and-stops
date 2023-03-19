import styled from "styled-components";
import { Bus } from "./Bus";
import { Marker } from "./Marker";

const getIcon = (icon) => {
  switch (icon) {
    case "Bus":
      return <Bus />;

    case "Marker":
      return <Marker />;

    default:
      return <Bus />;
  }
};

const IconWrapper = styled.div`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  display: inline-block;
  position: relative;
  vertical-align: top;

  & svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const Icon = ({ icon = "Bus", width = "16px", height = "16px" }) => {
  return (
    <IconWrapper $width={width} $height={height}>
      {getIcon(icon)}
    </IconWrapper>
  );
};

export default Icon;
