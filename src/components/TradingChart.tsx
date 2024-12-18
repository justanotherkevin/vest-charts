import {
  createChart,
  CrosshairMode,
  IChartApi,
  SeriesMarker,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { mockCandleSeriesData } from "../data/mock";
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
// const mockData = [
//   {
//     time: new Date("2024-01-16").getTime() as UTCTimestamp,
//     open: 26660.6,
//     high: 26660.64,
//     low: 26660.55,
//     close: 26660.59,
//   },
//   {
//     time: new Date("2024-01-17").getTime() as UTCTimestamp,
//     open: 26660.58,
//     high: 26660.62,
//     low: 26660.54,
//     close: 26660.57,
//   },
//   {
//     time: new Date("2024-01-18").getTime() as UTCTimestamp,
//     open: 26660.57,
//     high: 26660.63,
//     low: 26660.56,
//     close: 26660.6,
//   },
//   {
//     time: new Date("2024-01-19").getTime() as UTCTimestamp,
//     open: 26660.59,
//     high: 26660.64,
//     low: 26660.54,
//     close: 26660.58,
//   },
// ];
// const lineData = mockData.map((datapoint) => ({
//   time: datapoint.time,
//   value: (datapoint.close + datapoint.open) / 2,
// }));

let emojiReactions = {
  "2024-06-24T00:00:00Z": [
    { userId: "user1", emoji: "🚀" },
    { userId: "user2", emoji: "😎" },
  ],
  "2024-06-24T01:00:00Z": [
    { userId: "user3", emoji: "😡" },
    { userId: "user4", emoji: "😭" },
  ],
};
const chartOptions = {
  layout: {
    background: { color: "#1A1A1A" },
    textColor: "#DDD",
  },
  grid: {
    vertLines: { color: "#424242" },
    horzLines: { color: "#424242" },
  },

  timeScale: {
    timeVisible: true,
    borderColor: "#485c7b",
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  height: 400,
};
const candleStickOptions = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
};
const TradingChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !containerRef.current) return;

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart; // Store chart instance

    // Add candle sticks
    const series = chart.addCandlestickSeries(candleStickOptions);
    series.setData(mockCandleSeriesData);

    const data = mockCandleSeriesData;
    // find 'buy' and 'sell' markers added below.
    const marker_one = data[data.length - 39];
    const marker_two = data[data.length - 19];
    const datesForMarkers = [marker_one, marker_two];
    let indexOfMinPrice = 0;
    for (let i = 1; i < datesForMarkers.length; i++) {
      if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
        indexOfMinPrice = i;
      }
    }

    const markers: SeriesMarker<Time>[] = [
      {
        time: data[data.length - 48].time,
        position: "aboveBar",
        color: "#f68410",
        shape: "circle",
        text: "D",
      },
    ];
    for (let i = 0; i < datesForMarkers.length; i++) {
      if (i !== indexOfMinPrice) {
        markers.push({
          time: datesForMarkers[i].time,
          position: "aboveBar",
          color: "#e91e63",
          shape: "arrowDown",
          text: "Sell @ " + Math.floor(datesForMarkers[i].high + 2),
        });
      } else {
        markers.push({
          time: datesForMarkers[i].time,
          position: "belowBar",
          color: "#2196F3",
          shape: "arrowUp",
          text: "😅 Buy @ " + Math.floor(datesForMarkers[i].low - 2),
        });
      }
    }
    series.setMarkers(markers);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
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
