import { useCallback, useRef, useState } from "react";
import Confetti from "react-confetti";
import styled from "styled-components";
import Input from "./base/Input";
import LeverageSlider from "./base/Slider";
import { colors, space } from "./styles/theme";
import * as S from "./styles/utility";

const Row = styled.div`
  ${S.Flex}
  justify-content: space-between;
`;

const OrderFormContainer = styled.div`
  ${S.BaseContainer}
  position: relative;
  color: ${colors.text.secondary};
  > * {
    margin-bottom: ${space.md};
  }
`;
const ConfettiWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const randonWidth = {
  width: "84px",
};

const FeedsAndMis = styled.div`
  & > * {
    margin-bottom: ${space.xs};
  }
`;

const PrimaryText = styled.div`
  color: ${colors.text.primary};
`;

const SecondaryText = styled.div`
  color: ${colors.text.secondary};
`;

const ConfettiBtn = styled.button`
  background-color: ${colors.success};
  width: 100%;
  padding: ${space.md};
  color: #000;
`;

const OrderForm = () => {
  const [side, setSide] = useState<"LONG" | "SHORT">("LONG");
  const [leverage, setLeverage] = useState(2);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Mock data
  const mockData = {
    openPrice: "30,021.29",
    liquidationPrice: "300,212",
    slippage: "1.20",
    fee: "2.00",
  };
  const handleSubmit = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Hide after 3s
  }, []);
  return (
    <OrderFormContainer ref={confettiRef}>
      {showConfetti && (
        <ConfettiWrapper>
          <Confetti
            width={confettiRef?.current?.clientWidth || 100}
            height={confettiRef?.current?.clientHeight || 100}
            recycle={false}
            gravity={3}
            // wind={4}
            colors={["#fff", colors.success]}
            numberOfPieces={500}
          />
        </ConfettiWrapper>
      )}
      <S.TabButtons>
        <S.TabButton
          fullLength={true}
          active={`${side === "LONG"}`}
          onClick={() => setSide("LONG")}
        >
          LONG
        </S.TabButton>
        <S.TabButton
          fullLength={true}
          active={`${side === "SHORT"}`}
          onClick={() => setSide("SHORT")}
        >
          SHORT
        </S.TabButton>
      </S.TabButtons>

      <Row>
        <div>
          <div>Order type</div>
          <S.Dropdown defaultValue="market">
            <option>market</option>
            <option>limit</option>
            <option>stop</option>
          </S.Dropdown>
        </div>

        <div style={randonWidth}>
          <div>Open Price</div>
          <S.Value>{mockData.openPrice} USDC</S.Value>
        </div>
      </Row>

      <div>
        <Input
          label="size"
          id="order-size"
          placeholder="0"
          rightPlaceholder="USDC"
        />
        <div>Up to 1,458.173</div>
      </div>
      {/* Leavage */}
      <div>
        <LeverageSlider value={leverage} onChange={setLeverage} />
      </div>
      {/* fees and mis cost */}
      <FeedsAndMis>
        <Row>
          <SecondaryText>Liquidation Price</SecondaryText>
          <PrimaryText>{mockData.liquidationPrice} USDC</PrimaryText>
        </Row>

        <Row>
          <SecondaryText>Slippage</SecondaryText>
          <PrimaryText>{mockData.slippage} USDC (0.3%)</PrimaryText>
        </Row>

        <Row>
          <SecondaryText>Fee</SecondaryText>
          <PrimaryText>{mockData.fee} USDC (0.05%)</PrimaryText>
        </Row>
      </FeedsAndMis>

      <div>
        <S.Dropdown defaultValue="Advanced" value="advanced" widthSize="full">
          <option>Advanced</option>
        </S.Dropdown>
      </div>
      {showConfetti ? (
        <ConfettiBtn onClick={handleSubmit}>
          YOU JUST EARNED 200 {side} - TOKENS
        </ConfettiBtn>
      ) : (
        <S.SubmitButton side={side} onClick={handleSubmit}>
          BUY / {side}
        </S.SubmitButton>
      )}
    </OrderFormContainer>
  );
};
export default OrderForm;
