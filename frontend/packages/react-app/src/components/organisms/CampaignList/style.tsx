import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import Box from "@material-ui/core/Box";

export const TitleBox = styled(Box)`
  display: flex;

  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;
