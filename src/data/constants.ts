import { CrosshairMode } from "lightweight-charts";

export const CHART_CONFIG = {
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

export const CANDLE_STYLE = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
};
