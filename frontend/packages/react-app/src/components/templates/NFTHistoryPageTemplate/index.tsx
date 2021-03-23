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
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";
import AppFrame from "../../organisms/AppFrame";
import NFTCampaigns from "../../organisms/NFTCampaigns";
import { NFTTabMenuForFunPage } from "../../molecules/NFTTabMenuForFunPage";
import ConnectModal from "../../organisms/ConnectModal";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

export interface NFTHistoryTemplateProps {
  readonly library: Web3Provider | undefined;
  readonly state: TokenCampaignsState;
}

export const NFTHistoryTemplate: React.FC<NFTHistoryTemplateProps> = ({
  library,
  state,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(library === undefined);
  }, [library]);

  return (
    <>
      <AppFrame>
        <NFTTabMenuForFunPage current={"userHistory"} />
        <NFTCampaigns
          campaigns={state.campaigns}
          isOnlyView={true}
          currentTab="userHistory"
        />
        <ConnectModal open={open} onClose={() => setOpen(false)} />
      </AppFrame>
    </>
  );
};
