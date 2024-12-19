import { useEffect, useRef } from "react";
import styled from "styled-components";
import ETHChart from "./charts/ETHChart";
import { space } from "./styles/theme";
import { ChartButton, Row } from "./styles/utility";

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
          <ChartButton>1H</ChartButton>
          <ChartButton>4H</ChartButton>
          <ChartButton>1D</ChartButton>
          <ChartButton className="indicators-btn">INDICATORS</ChartButton>
        </ChartControls>
        <ChartControls>
          <ChartButton>⚙️</ChartButton>
          <ChartButton>⏹</ChartButton>
          <ChartButton>📷</ChartButton>
        </ChartControls>
      </Row>
      {/* <LeftsizeControl>
        <ChartButton>⚙️</ChartButton>
        <ChartButton>⏹</ChartButton>
        <ChartButton>📷</ChartButton>
      </LeftsizeControl> */}
      <ETHChart />
    </TradingChartContainer>
  );
};

export default TradingChart;
