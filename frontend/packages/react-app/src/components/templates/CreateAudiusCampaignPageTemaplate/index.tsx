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
import { Box, Typography, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import ApproveToken from "../../organisms/ApproveToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken } from "../../../interfaces";
import DistributionTargets from "../../organisms/AudiusDistributionTargets";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { AppFooter } from "../../molecules/AppFooter";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const CreateAudiusCampaignPageTemaplate: React.FC<CampaignInfo> = ({
  active,
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
  audiusState,
  audiusDispatch,
}) => (
  <div style={{ height: "100vh" }}>
    <AppHeader />
    <Box
      mt={5}
      style={{
        boxSizing: "border-box",
        height: "calc(100% - 266px)",
        minHeight: "300px",
      }}
    >
      <Container>
        {!active ? (
          <Box>
            <WalletConnect />
          </Box>
        ) : (
          <Box>
            <Box my={1}>
              <Typography variant={"h3"}>Audius Follower Campaign</Typography>
            </Box>
            {distributorFormState.step === 1 && (
              <DistributionTargets
                audiusState={audiusState}
                audiusDispatch={audiusDispatch}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
            {distributorFormState.step === 2 && (
              <ApproveToken
                tokenInfo={tokenInfo}
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
            {distributorFormState.step === 3 && (
              <SetupCampaign
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
    <AppFooter />
  </div>
);

export default CreateAudiusCampaignPageTemaplate;
