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
import { Box, Typography, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import ApproveToken from "../../organisms/ApproveToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import UploadEmailCsvPane from "../../organisms/UploadEmailCsvPane";
import { EMAIL_ACTIONS, EmailState } from "../../../reducers/email";
import DownloadEmailCsvPane from "../../organisms/DownloadEmailCsvPane";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenAddress: string;
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const CreateEmailCampaignPageTemplate: React.FC<CampaignInfo> = ({
  active,
  tokenAddress,
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
  emailState,
  emailDispatch,
}) => (
  <div>
    <AppHeader />
    <Box mt={5}>
      <Container>
        {!active ? (
          <Box>
            <WalletConnect />
          </Box>
        ) : (
          <Box>
            <Box my={1}>
              <Typography variant={"h3"}>Email Campaign</Typography>
            </Box>
            {distributorFormState.step === 1 && (
              <UploadEmailCsvPane
                emailState={emailState}
                emailDispatch={emailDispatch}
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
            {distributorFormState.step === 4 && (
              <DownloadEmailCsvPane
                tokenAddress={tokenAddress}
                campaignAddress={distributorFormState.createdCampaignAddress}
                emailState={emailState}
                emailDispatch={emailDispatch}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  </div>
);

export default CreateEmailCampaignPageTemplate;
