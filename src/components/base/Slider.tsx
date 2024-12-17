import styled from "styled-components";
import { space } from "../styles/theme";
import { Flex } from "../styles/utility";

const SliderContainer = styled.div`
  position: relative;
  margin-bottom: ${space.md};
`;

const RangeContainer = styled.div`
  position: relative;
  margin-bottom: ${space.md};
`;

const TickMarks = styled.div`
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 6px;
`;

const Tick = styled.div`
  width: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    margin-bottom: 12px;
  }
`;
const Range = styled.input`
  position: absolute;
  top: 8px;
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  margin: 0;
  color: #252525;
  border-radius: 2px;
  z-index: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Row = styled.div`
  ${Flex}
  justify-content: space-between;
  margin-bottom: ${space.md};
`;

const marks = [2, 5, 10, 25, 50, 100, 128];

const LeverageSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    // Find closest mark for snapping
    const closest = marks.reduce((prev, curr) =>
      Math.abs(curr - newVal) < Math.abs(prev - newVal) ? curr : prev
    );
    onChange(closest);
  };
  return (
    <SliderContainer>
      <Row>
        <label htmlFor="leverage">Leverage</label>
        <span>{value.toFixed(2)}X</span>
      </Row>

      <RangeContainer>
        <Range
          type="range"
          min={2}
          max={128}
          value={value}
          onChange={handleChange}
          list="markers"
          id="leverage"
          name="leverage"
        />
        <TickMarks>
          {marks.map((mark) => (
            <Tick>
              <div key={mark}>|</div>
              <div>{mark}X</div>
            </Tick>
          ))}
        </TickMarks>
      </RangeContainer>
    </SliderContainer>
  );
};

export default LeverageSlider;
