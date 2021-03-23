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
import { Dispatch } from "react";
import Typography from "@material-ui/core/Typography";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { useMemo } from "react";
import AppFrame from "../../organisms/AppFrame";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import WaitingProcessDialog from "../../molecules/WaitingProcessDialog";
import WalletNFTCampaignDetailPanel from "../../organisms/WalletNFTCampaignDetailPanel";
import { NFTTabMenuForFunPage } from "../../molecules/NFTTabMenuForFunPage";

export interface NFTCampaignsDetailTemplateProps {
  readonly active: boolean;
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
}

export const NFTCampaignsDetailTemplate: React.FC<NFTCampaignsDetailTemplateProps> = ({
  active,
  state,
  dispatch,
}) => {
  const CampaignDetailPanel = useMemo(() => {
    switch (state.distributorType) {
      case "wallet-nft":
      case "uuid-nft":
        return (
          <WalletNFTCampaignDetailPanel
            active={active}
            state={state}
            dispatch={dispatch}
          />
        );
    }

    return (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          lineHeight: "240px",
          height: 240,
        }}
      >
        <Typography>Campaign not found.</Typography>
      </div>
    );
  }, [state]);

  return (
    <>
      <AppFrame>
        <NFTTabMenuForFunPage current={"userHistory"} />
        <WaitingProcessDialog state={state} />
        <Wrapper>
          {state.campaign !== null &&
            state.campaign.campaignMetadata &&
            CampaignDetailPanel}
          {state.campaign === null && (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                lineHeight: "240px",
                height: 240,
              }}
            >
              <Typography>Campaign not found.</Typography>
            </div>
          )}
        </Wrapper>
      </AppFrame>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  ${theme.breakpoints.down(760)} {
    margin: 0 -26px;
  }
`;
