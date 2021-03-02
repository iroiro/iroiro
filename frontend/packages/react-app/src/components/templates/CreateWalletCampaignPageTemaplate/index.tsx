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
import { Box, Typography } from "@material-ui/core";
import { AccountToken } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { WALLET_ACTIONS } from "../../../reducers/wallet";
import { WalletList } from "../../../interfaces";
import CreateWalletAddressCampaignStepper from "../../organisms/CreateWalletAddressCampaignStepper";
import AppFrame from "../../organisms/AppFrame";
import { ACTIONS } from "../../../reducers/token";
import WaitingProcessDialog from "../../molecules/WaitingProcessDialog";
import { StyledStepperWrapper } from "../../../theme/commonStyles";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly walletListState: WalletList;
  readonly walletDispatch: React.Dispatch<WALLET_ACTIONS>;
}

const CreateWalletCampaignPageTemplate: React.FC<CampaignInfo> = ({
  active,
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
  walletListState,
  walletDispatch,
}) => (
  <>
    <AppFrame>
      {!active ? (
        <Box>
          <WalletConnect />
        </Box>
      ) : (
        <Box maxWidth={640} style={{ margin: "auto" }}>
          <StyledStepperWrapper variant="outlined">
            <Box p={1}>
              <Typography variant={"h3"}>Wallet Address Campaign</Typography>
            </Box>
            <WaitingProcessDialog distributorFormState={distributorFormState} />
            <CreateWalletAddressCampaignStepper
              tokenInfo={tokenInfo}
              tokenDispatch={tokenDispatch}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
              walletListState={walletListState}
              walletDispatch={walletDispatch}
            />
          </StyledStepperWrapper>
        </Box>
      )}
    </AppFrame>
  </>
);

export default CreateWalletCampaignPageTemplate;
