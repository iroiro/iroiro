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
import { Paper, Typography, Box, Button } from "@material-ui/core";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

export interface UUIDURLListProps {
  readonly tokenAddress: string;
  readonly campaignAddress: string;
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const UUIDURLList: React.FC<UUIDURLListProps> = ({
  tokenAddress,
  campaignAddress,
  uuidState,
  uuidDispatch,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const urlList = uuidState.rawTargets
    .map(
      (uuid) =>
        `${window.location.origin}/explore/${tokenAddress}/distributors/${uuidState.distributorAddress}/campaigns/${campaignAddress}?uuid=${uuid}`
    )
    .join("\n");

  return (
    <Box mt={2}>
      <Paper>
        <Box p={4}>
          <Box m={"auto"} width={[3 / 4]} mt={2}>
            <Typography variant={"h4"}>4. URL List</Typography>
            <Box mt={2}>
              <Typography display="inline">
                A campaign is created successfully and
              </Typography>
              <Typography display="inline" color="primary">
                {" "}
                {uuidState.rawTargets.length} campaign URLs{" "}
              </Typography>
              <Typography display="inline">
                are generated for your fans.
              </Typography>
              <Typography>
                Copy and distribute it! Please note, this URL will be deleted
                after you move from this page, so please be careful.
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            my={4}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Box mr={4}>
              <CopyToClipboard text={urlList} onCopy={() => setIsCopied(true)}>
                <Button color="primary" variant="contained">
                  Copy URLs to clipboard
                </Button>
              </CopyToClipboard>
            </Box>
            <Box>
              <Button
                color="secondary"
                variant="contained"
                disabled={!isCopied}
                onClick={() => {
                  uuidDispatch({ type: "moveToCampaignPage:on" });
                }}
              >
                Go to campaign detail
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UUIDURLList;
