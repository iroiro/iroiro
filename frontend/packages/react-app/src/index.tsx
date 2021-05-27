/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
// TODO Replace apollo client
import ApolloClientObsolete from "apollo-boost";
import { ApolloProvider as ApolloProviderObsolete } from "@apollo/react-hooks";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import muiTheme from "../src/theme/mui-theme";
import { SnackbarProvider } from "notistack";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 10000;
  return library;
};

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const clientObsolete = new ApolloClientObsolete({
  // TODO Update url to iroiro
  uri: process.env.REACT_APP_SUBGRAPH,
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_SUBGRAPH ?? "",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderObsolete client={clientObsolete}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              maxSnack={3}
              autoHideDuration={4000}
            >
              <App />
            </SnackbarProvider>
          </Web3ReactProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ApolloProviderObsolete>
  </ApolloProvider>,
  document.getElementById("root")
);
