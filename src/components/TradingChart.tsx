import { useEffect, useRef } from "react";
import styled from "styled-components";
import ETHChart from "./charts/ETHChart";
import { space } from "./styles/theme";
import { Flex } from "./styles/utility";

const TradingChartContainer = styled.div`
  background: #1a1a1a;
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  max-width: 928px;
  box-sizing: border-box;
`;
const ChartControls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;
const Button = styled.button`
  background: #242424;
  border: none;
  color: #ddd;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;
const Row = styled.div`
  ${Flex}
  justify-content: space-between;
`;
const LeftsizeControl = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40px;
  & > * {
    margin-bottom: ${space.sm};
  }
`;

const TradingChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <TradingChartContainer ref={containerRef}>
      <Row>
        <ChartControls>
          <Button>1H</Button>
          <Button>4H</Button>
          <Button>1D</Button>
          <Button className="indicators-btn">INDICATORS</Button>
        </ChartControls>
        <ChartControls>
          <Button>⚙️</Button>
          <Button>⏹</Button>
          <Button>📷</Button>
        </ChartControls>
      </Row>
      {/* <LeftsizeControl>
        <Button>⚙️</Button>
        <Button>⏹</Button>
        <Button>📷</Button>
      </LeftsizeControl> */}
      <ETHChart />
    </TradingChartContainer>
  );
};

export default TradingChart;
