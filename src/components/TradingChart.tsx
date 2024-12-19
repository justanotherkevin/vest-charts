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

type Reaction = {
  userId: string;
  emoji: string;
};

type EmojiReactions = {
  [date: string]: Reaction[];
};
let emojiReactions: EmojiReactions = {
  "2018-09-22T00:00:00Z": [
    { userId: "user1", emoji: "🚀" },
    { userId: "user2", emoji: "😎" },
  ],
  "2024-06-24T01:00:00Z": [
    { userId: "user3", emoji: "😡" },
    { userId: "user4", emoji: "😭" },
  ],
};

const CHART_CONFIG = {
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

const CANDLE_STYLE = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
};
function parseISODate(isoString: string) {
  const date = new Date(isoString);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1, // +1 because getMonth() returns 0-11
    day: date.getUTCDate(),
  };
}
// Helper function
function createMarkers(data: any[]): SeriesMarker<Time>[] {
  const newMarkers = [];

  for (let emojiReaction in emojiReactions) {
    const { year, month, day } = parseISODate(emojiReaction);
    const usersReaction = emojiReactions[emojiReaction];
    const allEmoji = usersReaction.reduce(
      (combineString, user) => combineString + " " + user.emoji,
      ""
    );
    const data = {
      time: { year, month, day } as Time,
      position: "aboveBar",
      color: "#f210f6",
      shape: "circle",
      text: `initial markerrrrrrr ${allEmoji}`,
    } as SeriesMarker<Time>;
    newMarkers.push(data);
  }
  return newMarkers;
}
const TradingChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !containerRef.current) return;

    const chart = createChart(chartContainerRef.current, CHART_CONFIG);
    chartRef.current = chart;

    const series = chart.addCandlestickSeries(CANDLE_STYLE);
    series.setData(mockCandleSeriesData);

    const markers = createMarkers(mockCandleSeriesData);
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
