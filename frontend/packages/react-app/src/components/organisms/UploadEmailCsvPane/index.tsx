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
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { EMAIL_ACTIONS, EmailState } from "../../../reducers/email";

export interface TargetsProps {
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const UploadEmailCsvPane: React.FC<TargetsProps> = ({
  distributorFormDispatch,
  emailState,
  emailDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>1. Upload your fans email list</Typography>
        </Box>
        {emailState.targets.length > 0 ? (
          <>
            <Box my={4} style={{ textAlign: "center" }}>
              <Typography>Total Email Addresses</Typography>
              <Typography variant="h2">{emailState.targets.length}</Typography>
            </Box>
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
          </>
        ) : (
          <>
            <Box my={2}>
              <Typography variant={"body1"}>File type: CSV</Typography>
              <Typography variant={"body1"}>
                CSV must contain email column.
              </Typography>
            </Box>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                accept="text/csv"
                hidden
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  emailDispatch({
                    type: "emailListFile:upload",
                    payload: {
                      walletlistFile: event.target.files,
                    },
                  })
                }
              />
            </Button>
            {!emailState.fileformat && (
              <Box mt={1}>
                <Typography color={"error"}>
                  Set a file in the correct format.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Card>
  </>
);

export default UploadEmailCsvPane;
