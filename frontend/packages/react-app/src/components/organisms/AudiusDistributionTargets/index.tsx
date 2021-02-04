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
import { Box, Typography, Card, Button } from "@material-ui/core";
import DistributionTargetList from "../../molecules/DistributionTargetList";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import SignOutAudius from "../../molecules/SignOutAudius";

export interface TargetsProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const AudiusDistributionTargets: React.FC<TargetsProps> = ({
  audiusState,
  audiusDispatch,
  distributorFormDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>1. Check your followers list</Typography>
        </Box>
        <Box
          mt={4}
          my={2}
          display="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant={"h4"}>Audius Followers list</Typography>
          <Typography>Total users: {audiusState.followersCount}</Typography>
        </Box>
        <DistributionTargetList
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
        {audiusState.followers.length > 0 && (
          <Box my={5} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Card>
    {audiusState.followers.length > 0 && (
      <SignOutAudius
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
      />
    )}
  </>
);

export default AudiusDistributionTargets;
