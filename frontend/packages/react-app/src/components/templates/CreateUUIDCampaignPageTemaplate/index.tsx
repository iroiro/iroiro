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
import { Box, Typography, Container, Paper } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { AccountToken } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";
import CreateUUIDCampaignStepper from "../../organisms/CreateUUIDCampaignStepper";
import AppFrame from "../../organisms/AppFrame";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenAddress: string;
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const CreateUUIDCampaignPageTemplate: React.FC<CampaignInfo> = ({
  active,
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
  uuidState,
  uuidDispatch,
}) => (
  <>
    <AppFrame>
      {!active ? (
        <Box>
          <WalletConnect />
        </Box>
      ) : (
        <Box maxWidth={640} style={{ margin: "auto" }}>
          <Paper variant="outlined" style={{ padding: 40, border: "none" }}>
            <Box my={1}>
              <Typography variant={"h3"}>URL Campaign</Typography>
            </Box>
            <CreateUUIDCampaignStepper
              tokenInfo={tokenInfo}
              distributorFormState={distributorFormState}
              uuidState={uuidState}
              distributorFormDispatch={distributorFormDispatch}
              uuidDispatch={uuidDispatch}
            />
          </Paper>
        </Box>
      )}
    </AppFrame>
  </>
);

export default CreateUUIDCampaignPageTemplate;
