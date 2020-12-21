import React from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import customTheme from "../src/theme/rinble-ui-theme";
import "../src/index.css";
import muiTheme from "../src/theme/mui-theme";

export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={customTheme}>
        <Story />
      </ThemeProvider>
    </MuiThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
