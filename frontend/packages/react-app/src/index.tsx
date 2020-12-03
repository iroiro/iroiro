import * as React from "react";
import * as ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import { theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 10000;
  return library;
};

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  // TODO Update url to iroiro
  uri: "https://api.thegraph.com/subgraphs/name/tart-tokyo/iroiro-rinkeby",
});

const customTheme = {
  ...theme,
};

customTheme.colors.primary = "#E25E89";
customTheme.colors.black = "#333";

customTheme.colors.ired = "#FFACC7";
customTheme.colors.igreen = "#CAFC74";
customTheme.colors.iblue = "#92DDE6";
customTheme.colors.iyellow = "#EFEC6B";

customTheme.colors.itred = "#E25E89";
customTheme.colors.itgreen = "#9DD837";
customTheme.colors.itblue = "#48C5D5";
customTheme.colors.ityellow = "#E3DF2D";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={customTheme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
