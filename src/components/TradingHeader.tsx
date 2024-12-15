import styled from "styled-components";
import { colors } from "./styles/theme";
import { Dropdown, Flex, InputStyled } from "./styles/utility";

type TradingHeaderProps = {
  symbol: string;
  price: number;
  change24h: string;
  funding: string;
  longInterest: string;
  shortInterest: string;
};
const SearchContainer = styled.div`
  ${Flex}
`;
const ResultContainer = styled.div`
  ${Flex}
  > * {
    margin-right: 16px;
  }
`;

type MetricProps = {
  label: string;
  text: string;
  positive?: boolean;
};
const Metric = styled.div`
  > :nth-child(1) {
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    color: ${colors.text.secondary};
    text-transform: uppercase;
  }
  > :nth-child(2) {
    font-size: 14px;
    font-weight: 700;
    line-height: 18.2px;
  }

  .gain {
    color: ${colors.success};
  }

  .lost {
    color: ${colors.danger};
  }
`;
const MetricContainer = ({ label, text, positive }: MetricProps) => {
  let numberColorClass = "";
  if (positive !== undefined) {
    numberColorClass = positive === true ? "gain" : "lost";
  }
  return (
    <Metric>
      <div className="icon">{label}</div>
      <div className={numberColorClass}>{text}</div>
    </Metric>
  );
};

const TradingHeader = ({
  symbol,
  price,
  change24h,
  funding,
  longInterest,
  shortInterest,
}: TradingHeaderProps) => (
  <div className="">
    <SearchContainer>
      <InputStyled />
      {/* is this a wallet? */}
      <Dropdown defaultValue="0xFC...E63D1">
        <option>0xFC...E63D1</option>
      </Dropdown>
    </SearchContainer>

    <ResultContainer>
      <div>
        <span className="icon">₿</span>
        <span>{symbol}</span>
      </div>

      <MetricContainer label={"price"} text={"$31,119.01"} />
      <MetricContainer
        label={"24h change"}
        text={"+22.3 USDC (+7.5$)"}
        positive={true}
      />
      <MetricContainer
        label={"1h funding"}
        text={"0.00012%"}
        positive={false}
      />
      <MetricContainer label={"long open interest"} text={"8.871 BTC"} />
      <MetricContainer label={"Short Open Interest"} text={"8.871 BTC"} />
    </ResultContainer>
  </div>
);
export default TradingHeader;
