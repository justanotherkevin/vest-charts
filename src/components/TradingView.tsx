import { useState } from "react";
import styled from "styled-components";
import OrderForm from "./OrderForm";
import TradingChart from "./TradingChart";
import TradingHeader from "./TradingHeader";
import * as S from "./styles/utility";

const GridContainer = styled.div`
  display: grid;
  column-gap: 16px;
  grid-template-columns: minmax(640px, auto) 360px;

  justify-items: stretch;
`;
const TradingViewContainer = styled.div`
  width: 100%;
  max-width: 1264px;
`;

const TradingView = () => {
  const [side, setSide] = useState<"PRICE" | "FUNDING">("PRICE");
  return (
    <TradingViewContainer>
      <TradingHeader
        symbol="BTC/BITCOIN"
        price={31119.01}
        change24h="+22.3 USDC (+7.5%)"
        funding="0.00012%"
        longInterest="8.871 BTC"
        shortInterest="8.871 BTC"
      />

      <S.TabButtons>
        <S.TabButton active={side === "PRICE"} onClick={() => setSide("PRICE")}>
          PRICE
        </S.TabButton>
        <S.TabButton
          active={side === "FUNDING"}
          onClick={() => setSide("FUNDING")}
        >
          FUNDING
        </S.TabButton>
      </S.TabButtons>

      <GridContainer>
        <div className="chart-section borderrr">
          <TradingChart />
        </div>
        <div className="order-section borderrr">
          <OrderForm />
        </div>
      </GridContainer>
    </TradingViewContainer>
  );
};
export default TradingView;
