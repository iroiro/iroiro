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

import React, { useEffect, useState } from "react";
import { useTokenContext } from "../../../context/token";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { TabMenuForFunPage } from "../../molecules/TabMenuForFunPage";
import TokenInfoBar from "../../molecules/TokenInfoBar";
import AppFrame from "../../organisms/AppFrame";
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
    <>
      <AppFrame>
        <TokenInfoBar />
        <TabMenuForFunPage
          tokenAddress={tokenAddress}
          current={"userHistory"}
        />
        <UserHistory state={state} />
      </AppFrame>
      <ConnectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
