import * as React from "react";
import * as ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import customTheme from "./theme/rinble-ui-theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import muiTheme from "../src/theme/mui-theme";

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={customTheme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
