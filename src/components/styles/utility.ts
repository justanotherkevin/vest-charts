import styled, { css } from "styled-components";
import { colors, radius, space } from "./theme";

export const TabButtons = styled.div`
  display: flex;
  margin-bottom: ${space.xl};
  border-bottom: 1px solid ${colors.border};
`;

export const TabButton = styled.button<{
  active: boolean;
  fullLength?: boolean;
}>`
  flex: ${(p) => (p.fullLength ? 1 : 0)};
  padding: ${space.sm};
  background: none;
  border: none;
  color: ${(p) => (p.active ? colors.primary : colors.text.primary)};
  border-bottom: 2px solid ${(p) => (p.active ? colors.primary : "transparent")};
  cursor: pointer;
`;

export const Field = styled.div`
  margin-bottom: ${space.lg};
`;

export const Value = styled.div`
  text-align: right;
  color: ${colors.text.primary};
`;

export const InputStyled = styled.input`
  width: 100%;
  background: ${colors.bg.info};
  border: none;
  padding: ${space.sm};
  color: ${colors.text.primary};
  border-radius: ${radius.default};
  box-sizing: border-box;
`;

export const SubmitButton = styled.button<{ side: "LONG" | "SHORT" }>`
  width: 100%;
  padding: ${space.md};
  border: none;
  border-radius: ${radius.default};
  background: ${(p) => (p.side === "LONG" ? colors.success : colors.primary)};
  color: ${colors.text.primary};
  cursor: pointer;
`;

export const Dropdown = styled.select<{ widthSize?: "full" | "sm" }>`
  ${(props) =>
    props?.widthSize &&
    props?.widthSize === "full" &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props?.widthSize &&
    props?.widthSize === "sm" &&
    css`
      width: 168px;
    `}

  background: ${colors.bg.tertiary};
  padding: ${space.xs} ${space.md};
  border-radius: ${radius.default};
  border: none;
  color: ${colors.text.primary};
`;

export const Flex = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const BaseContainer = css`
  background: ${colors.bg.secondary};
  padding: ${space.lg};
`;
