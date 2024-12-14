interface TradingHeaderProps {
  symbol: string;
  price: number;
  change24h: string;
  funding: string;
  longInterest: string;
  shortInterest: string;
}

const TradingHeader = ({
  symbol,
  price,
  change24h,
  funding,
  longInterest,
  shortInterest,
}: TradingHeaderProps) => (
  <div className="trading-header">
    <div className="symbol-price">
      <h2>{symbol}</h2>
      <span className="price">${price}</span>
      <span className="change">{change24h}</span>
    </div>
    <div className="metrics">
      <span>Funding: {funding}</span>
      <span>Long Interest: {longInterest}</span>
      <span>Short Interest: {shortInterest}</span>
    </div>
  </div>
);
export default TradingHeader;
