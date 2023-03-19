import { useState } from "react";

import Lines from "../Lines";
import Stops from "../Stops";

const Container = ({ sortedData }) => {
  const [activeLine, setActiveLine] = useState(sortedData?.[0]?.lineNumber);

  return (
    <>
      <Lines
        lines={sortedData}
        activeLine={activeLine}
        setActiveLine={setActiveLine}
      />
      <Stops line={sortedData.find((data) => data.lineNumber === activeLine)} />
    </>
  );
};

export default Container;
