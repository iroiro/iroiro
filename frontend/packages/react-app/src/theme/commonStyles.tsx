import { Button, Paper, Stepper, TextField } from "@material-ui/core";
import styled, { css } from "styled-components";
import theme from "./mui-theme";

const buttonStyle = css`
  width: 100%;
  height: 45px;
`;

export const StyledStepperWrapper = styled(Paper)`
  padding: 40px;
  border: none;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
    margin: -28px;
  }
`;

export const StyleStepper = styled(Stepper)`
  max-width: 680px;
  ${theme.breakpoints.down(600)} {
    padding: 8px;
  }
`;

export const StyledStepperButton = styled(Button)`
  width: 140px;
  margin-right: 8px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
    height: 45px;
    margin-bottom: 8px;
  }
`;

export const TokenConfirmButton = styled(Button)`
  ${theme.breakpoints.down(600)} {
    ${buttonStyle}
  }
`;

export const StartCampaignButton = styled(Button)`
  ${theme.breakpoints.down(600)} {
    ${buttonStyle}
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: start;
  margin-bottom: 16px;
  ${theme.breakpoints.down(600)} {
    display: block;
    margin-bottom: 26px;
  }
`;

export const TokenInput = styled(TextField)`
  width: 200px;
  margin-right: 8px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;
