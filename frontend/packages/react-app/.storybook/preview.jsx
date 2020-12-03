import React from "react";
import { ThemeProvider } from "styled-components";
import customTheme from "../src/theme/rinble-ui-theme";
import "../src/index.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={customTheme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
