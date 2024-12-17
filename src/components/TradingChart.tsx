import { createChart, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";
import styled from "styled-components";
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
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  width: 40px;
  & > * {
    margin-bottom: ${space.sm};
  }
`;
// Mock data
const mockData = [
  {
    time: new Date("2024-01-16").getTime() as UTCTimestamp,
    open: 26660.6,
    high: 26660.64,
    low: 26660.55,
    close: 26660.59,
  },
  {
    time: new Date("2024-01-17").getTime() as UTCTimestamp,
    open: 26660.58,
    high: 26660.62,
    low: 26660.54,
    close: 26660.57,
  },
  {
    time: new Date("2024-01-18").getTime() as UTCTimestamp,
    open: 26660.57,
    high: 26660.63,
    low: 26660.56,
    close: 26660.6,
  },
  {
    time: new Date("2024-01-19").getTime() as UTCTimestamp,
    open: 26660.59,
    high: 26660.64,
    low: 26660.54,
    close: 26660.58,
  },
];
const TradingChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !containerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1A1A1A" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#242424" },
        horzLines: { color: "#242424" },
      },
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(mockData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // Set as an overlay
    });

    const volumeData = mockData.map((item) => ({
      time: item.time,
      value: Math.random() * 100,
      color: item.open <= item.close ? "#26a69a" : "#ef5350",
    }));

    volumeSeries.setData(volumeData);
    // chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

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
      {/* <Row></Row> */}
      {/* <LeftsizeControl>
        <Button>⚙️</Button>
        <Button>⏹</Button>
        <Button>📷</Button>
      </LeftsizeControl> */}
      <div ref={chartContainerRef} />
    </TradingChartContainer>
  );
};

export default TradingChart;
