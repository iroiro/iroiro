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
import TokenCampaigns from "../../organisms/TokenCampaigns";
import { TabMenuForFunPage } from "../../molecules/TabMenuForFunPage";
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";
import TokenInfoBar from "../../molecules/TokenInfoBar";
import AppFrame from "../../organisms/AppFrame";

export interface TokenCampaignsTemplateProps {
  state: TokenCampaignsState;
  tokenAddress: string;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  return (
    <>
      <AppFrame>
        <TokenInfoBar />
        <TabMenuForFunPage tokenAddress={tokenAddress} current={"campaigns"} />
        <TokenCampaigns
          campaigns={state.campaigns}
          tokenAddress={tokenAddress}
        />
      </AppFrame>
    </>
  );
};
