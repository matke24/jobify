import React, { useState } from "react";

import Wrapper from "../assets/wrappers/ChartsContainer";
import { AreaChart, BarChart } from ".";

const ChartsContainer: React.FC = () => {
  const [isBarChart, setIsBarChart] = useState<boolean>(true);

  return (
    <Wrapper>
      <h4>Monthly applications</h4>
      <button type="button" onClick={() => setIsBarChart(!isBarChart)}>
        {isBarChart ? "Bar Chart" : "Area Chart"}
      </button>
      {isBarChart ? <BarChart /> : <AreaChart />}
    </Wrapper>
  );
};

export default ChartsContainer;
