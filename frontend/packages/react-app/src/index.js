import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import { theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/tart-tokyo/fan-stock",
});

const customTheme = {
  ...theme,
}

customTheme.colors.primary = '#E25E89'
customTheme.colors.black = '#333'

customTheme.colors.ired = '#FFACC7'
customTheme.colors.igreen = '#CAFC74'
customTheme.colors.iblue= '#92DDE6'
customTheme.colors.iyellow = '#EFEC6B'

customTheme.colors.itred = '#E25E89'
customTheme.colors.itgreen = '#9DD837'
customTheme.colors.itblue= '#48C5D5'
customTheme.colors.ityellow = '#E3DF2D'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
document.getElementById("root"),
);
