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
import { Box } from "@material-ui/core";
import SetupCampaignForm from "../../molecules/SetupCampaignForm";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import SetupNFTCampaignForm from "../../molecules/SetupNFTCampaignForm";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaign: React.FC<SetupCampaignFormProps> = ({
  distributorFormState,
  distributorFormDispatch,
}) => {
  const form = () => {
    switch (distributorFormState.distributorType) {
      case "wallet-nft":
      case "uuid-nft":
      case "email-nft":
        return (
          <SetupNFTCampaignForm
            distributorFormDispatch={distributorFormDispatch}
            distributorFormState={distributorFormState}
          />
        );
      default:
        return (
          <SetupCampaignForm
            distributorFormDispatch={distributorFormDispatch}
            distributorFormState={distributorFormState}
          />
        );
    }
  };

  return (
    <Box mt={2}>
      <Box>{form}</Box>
    </Box>
  );
};

export default SetupCampaign;
