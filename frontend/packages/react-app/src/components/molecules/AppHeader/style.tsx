import Box from "@material-ui/core/Box";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export const Header = styled.header`
  position: relative;
  background-color: white;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #333333;
  min-width: ${theme.breakpoints.values.xs}px;
  overflow: hidden;

  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export const PcMenuBox = styled(Box)`
  display: flex;
  ${theme.breakpoints.down(600)} {
    display: none;
  }
`;

export const SpMenuBox = styled(Box)`
  text-align: right;
  padding: 18px 0 40px;
  position: absolute;
  right: 0;
  top: 58px;
  transition: all 0.8s ease-out;
  opacity: 0;
  ${theme.breakpoints.up(600)} {
    display: none;
  }
`;

export const LogoBox = styled(Box)`
  padding-left: ${theme.spacing(4)}px;
  ${theme.breakpoints.down(600)} {
    padding: ${theme.spacing(2)}px;
  }
`;

export const IconBox = styled(Box)`
  position: absolute;
  top: 8px;
  right: 0;
  padding-right: ${theme.spacing(1)}px;
  ${theme.breakpoints.up(600)} {
    display: none;
  }
`;

export const WalletButtonBox = styled(Box)`
  ${theme.breakpoints.down(600)} {
    display: flex;
    justify-content: flex-end;
  }
`;

export const SpMenuWrapper = styled.div`
  transition: all 0.8s ease-out;
  ${theme.breakpoints.up(600)} {
    display: none;
  }
`;
