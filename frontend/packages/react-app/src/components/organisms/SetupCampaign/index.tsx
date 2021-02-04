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
import { Card, Box, Typography, Button } from "@material-ui/core";
import SetupCampaignForm from "../../molecules/SetupCampaignForm";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import WaitingProcessDialog from "../../molecules/WaitingProcessDialog";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaign: React.FC<SetupCampaignFormProps> = ({
  distributorFormState,
  distributorFormDispatch,
}) => {
  return (
    <Box mt={2}>
      <Card>
        <Box p={4}>
          <Box m={"auto"} width={[3 / 4]}>
            <Typography variant={"h3"}>3. Setup basic info</Typography>
            <SetupCampaignForm
              distributorFormDispatch={distributorFormDispatch}
              distributorFormState={distributorFormState}
            />
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="default"
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Card>
      <WaitingProcessDialog distributorFormState={distributorFormState} />
    </Box>
  );
};

export default SetupCampaign;
