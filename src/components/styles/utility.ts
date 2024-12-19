import styled, { css } from "styled-components";
import { colors, radius, space } from "./theme";
// Base style
const baseButtonStyle = css`
  border: none;
  border-radius: ${radius.default};
  cursor: pointer;
`;

const baseInputStyle = css`
  background: ${colors.bg.info};
  border: none;
  border-radius: ${radius.default};
  color: ${colors.text.primary};
  padding: ${space.sm};
  box-sizing: border-box;
`;
// buttons
export const TabButtons = styled.div`
  display: flex;
  margin-bottom: ${space.xl};
  border-bottom: 1px solid ${colors.border};
`;

export const TabButton = styled.button<{
  active: string;
  fullLength?: boolean;
}>`
  ${baseButtonStyle}
  flex: ${(p) => (p.fullLength ? 1 : 0)};
  padding: ${space.sm};
  background: none;
  color: ${(p) => (p.active === "true" ? colors.primary : colors.text.primary)};
  border-bottom: 2px solid
    ${(p) => (p.active === "true" ? colors.primary : "transparent")};
`;

export const ChartButton = styled.button`
  ${baseButtonStyle}
  background: ${colors.btn.primary};
  color: ${colors.text.light};
  padding: ${space.xs} ${space.sm};
  &:hover {
    background: ${colors.btn.hover};
  }
`;

export const SubmitButton = styled.button<{ side: "LONG" | "SHORT" }>`
  ${baseButtonStyle}
  width: 100%;
  padding: ${space.md};
  background: ${(p) => (p.side === "LONG" ? colors.success : colors.primary)};
  color: ${colors.text.primary};
`;
// non buttons 😂
export const Field = styled.div`
  margin-bottom: ${space.lg};
`;

export const Value = styled.div`
  text-align: right;
  color: ${colors.text.primary};
`;

export const InputStyled = styled.input`
  ${baseInputStyle}
  width: 100%;
`;

export const Dropdown = styled.select<{ widthSize?: "full" | "sm" }>`
  ${baseInputStyle}
  width: ${(p) =>
    p.widthSize === "sm" ? "168px" : p.widthSize === "full" ? "100%" : "auto"};
  background: ${colors.bg.tertiary};
  padding: ${space.xs} ${space.md};
`;

// Layout components
export const Flex = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const Row = styled.div`
  ${Flex}
  justify-content: space-between;
`;
export const BaseContainer = css`
  background: ${colors.bg.secondary};
  padding: ${space.lg};
`;
