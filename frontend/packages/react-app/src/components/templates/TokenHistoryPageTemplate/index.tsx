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

import { Box, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTokenContext } from "../../../context/token";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { AppFooter } from "../../molecules/AppFooter";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFunPage } from "../../molecules/TabMenuForFunPage";
import TokenInfoBar from "../../molecules/TokenInfoBar";
import ConnectModal from "../../organisms/ConnectModal";
import UserHistory from "../../organisms/UserHistory";

export interface TokenHistoryTemplateProps {
  state: TokenHistoryState;
  tokenAddress: string;
}

export const TokenHistoryTemplate: React.FC<TokenHistoryTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  const { state: tokenState } = useTokenContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tokenState.token === undefined) {
      return;
    }

    if (tokenState.userAddress === "") {
      setOpen(true);
    }
  }, [tokenState]);

  return (
    <div style={{ height: "100%", minHeight: "100vh" }}>
      <AppHeader />
      <Box
        m={"auto"}
        minWidth={320}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 190px)",
          minHeight: "600px",
        }}
      >
        <Container maxWidth="md">
          <Box
            style={{
              boxSizing: "border-box",
              padding: 24,
              maxWidth: 860,
              margin: "0 auto",
              minWidth: 320,
            }}
          >
            <TokenInfoBar />
            <TabMenuForFunPage
              tokenAddress={tokenAddress}
              current={"userHistory"}
            />
            <UserHistory state={state} />
          </Box>
        </Container>
      </Box>
      <AppFooter />
      <ConnectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
