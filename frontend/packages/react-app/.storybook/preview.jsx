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

import React from "react";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import "../src/index.css";
import muiTheme from "../src/theme/mui-theme";
import { TokenProvider } from "../src/context/token";
import { initialValue, tokenReducer } from "../src/reducers/tokenContext";
import { tokenInformationState } from "../src/utils/mockData";

export const decorators = [
  (Story) => (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <TokenProvider
          initialValue={{
            ...initialValue,
            token: tokenInformationState.token,
            userAddress: tokenInformationState.userAddress,
            userBalance: tokenInformationState.userBalance,
          }}
          reducer={tokenReducer}
        >
          <Story />
        </TokenProvider>
      </MuiThemeProvider>
    </StylesProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
