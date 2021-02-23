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
// import DistributionTargetList from "../../molecules/DistributionTargetList";
// import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { WalletList } from "../../../interfaces";
import { WALLET_ACTIONS } from "../../../reducers/wallet";

export interface TargetsProps {
  readonly walletListState: WalletList;
  readonly walletDispatch: React.Dispatch<WALLET_ACTIONS>;
}

export const upperLimit = Number.parseInt(
  process.env?.REACT_APP_TARGETS_UPPER_LIMIT ?? "0"
);

const WalletDistributionTargets: React.FC<TargetsProps> = ({
  walletListState,
  walletDispatch,
}) => (
  <>
    <Box mb={5}>
      {walletListState.targets.length > 0 ? (
        <>
          <Box mt={4}>
            <Typography>Total Wallet Addresses</Typography>
            <Typography variant="h2">
              {walletListState.targets.length}
            </Typography>
          </Box>
          <Box>
            {upperLimit < walletListState.targets.length && (
              <Box mt={1}>
                <Typography color={"error"}>
                  Wallet address number exceeds upper limit.
                </Typography>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box my={2}>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant={"caption"} style={{ paddingRight: 8 }}>
                File type:
              </Typography>
              <Typography variant={"body1"}>JSON</Typography>
            </Box>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant={"caption"}>Format: </Typography>
              <Box ml={2}>
                <Typography variant={"body1"} color={"secondary"}>
                  {`{"targets": ["walletaddress1", "walletaddress2"]}`}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant={"caption"}>Target number limit: </Typography>
              <Box ml={2}>
                <Typography variant={"body1"}>{upperLimit}</Typography>
              </Box>
            </Box>
          </Box>
          <Button variant="outlined" component="label" color="secondary">
            Upload File
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                walletDispatch({
                  type: "walletlistFile:upload",
                  payload: {
                    walletlistFile: event.target.files,
                  },
                })
              }
            />
          </Button>
          {!walletListState.fileformat && (
            <Box mt={1}>
              <Typography color={"error"}>
                Set a file in the correct format.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  </>
);

export default WalletDistributionTargets;
