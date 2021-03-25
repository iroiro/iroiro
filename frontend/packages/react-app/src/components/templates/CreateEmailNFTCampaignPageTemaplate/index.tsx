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
import { Box, Typography } from "@material-ui/core";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { EMAIL_ACTIONS, EmailState } from "../../../reducers/email";
import CreateEmailNFTCampaignStepper from "../../organisms/CreateEmailNFTCampaignStepper";
import AppFrame from "../../organisms/AppFrame";
import { StyledStepperWrapper } from "../../../theme/commonStyles";
import WaitingProcessDialog from "../../molecules/WaitingProcessDialog";

export interface CreateEmailNFTCampaignPageTemplateProps {
  readonly active: boolean;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const CreateEmailNFTCampaignPageTemplate: React.FC<CreateEmailNFTCampaignPageTemplateProps> = ({
  active,
  distributorFormState,
  distributorFormDispatch,
  emailState,
  emailDispatch,
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
            <Box my={1}>
              <Typography variant={"h3"}>NFT Campaign with Email</Typography>
            </Box>
            <WaitingProcessDialog state={distributorFormState} />
            <CreateEmailNFTCampaignStepper
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
              emailState={emailState}
              emailDispatch={emailDispatch}
            />
          </StyledStepperWrapper>
        </Box>
      )}
    </AppFrame>
  </>
);

export default CreateEmailNFTCampaignPageTemplate;
