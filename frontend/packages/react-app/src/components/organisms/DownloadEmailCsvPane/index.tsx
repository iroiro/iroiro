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
import { useState } from "react";
import { EMAIL_ACTIONS, EmailState } from "../../../reducers/email";
import { CSVLink } from "react-csv";
import styled from "styled-components";

export interface DownloadEmailCsvPaneProps {
  readonly tokenAddress: string;
  readonly campaignAddress: string;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const StyledCSVLink = styled(CSVLink)`
  text-decoration: none;
`;

const DownloadEmailCsvPane: React.FC<DownloadEmailCsvPaneProps> = ({
  tokenAddress,
  campaignAddress,
  emailState,
  emailDispatch,
}) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const urlList = emailState.rawTargets.map(
    (uuid) =>
      `${window.location.origin}${window.location.pathname}#/explore/${tokenAddress}/distributors/${emailState.distributorAddress}/campaigns/${campaignAddress}?uuid=${uuid}`
  );
  const emailUrlPair = emailState.emailList.map((email, index) => {
    return [email, urlList[index]];
  });
  const csvData = [["Email", "Campaign URL"], ...emailUrlPair];

  return (
    <Box mt={2}>
      <Paper>
        <Box p={4}>
          <Box m={"auto"} width={[3 / 4]} mt={2}>
            <Typography variant={"h4"}>4. Download CSV</Typography>
            <Box mt={2}>
              <Typography display="inline">
                A campaign is created successfully for
              </Typography>
              <Typography display="inline" color="primary">
                {" "}
                {emailState.rawTargets.length} Email addresses
              </Typography>
              <Typography display="inline"> that you have uploaded.</Typography>
              <Typography>
                Download CSV contains Email and campaign URL pair for each
                address and send a email for them!
              </Typography>
              <Typography>
                You can send a Email using batch email sending service such as{" "}
                <a
                  href="https://www.mergemail.co/"
                  target="_blank"
                  rel="noreferrer"
                >
                  MergeMail
                </a>
                ,{" "}
                <a
                  href="https://www.gmass.co/"
                  target="_blank"
                  rel="noreferrer"
                >
                  GMass
                </a>{" "}
                or{" "}
                <a href="https://yamm.com/" target="_blank" rel="noreferrer">
                  YAMM
                </a>
                .
              </Typography>
              <Typography>
                Please note, this file will be deleted after you move from this
                page, so please be careful.
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            my={4}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Box mr={4}>
              <StyledCSVLink
                data={csvData}
                onClick={() => setIsDownloaded(true)}
                filename="email-distribution-targets.csv"
              >
                <Button color="primary" variant="contained">
                  Download CSV file
                </Button>
              </StyledCSVLink>
            </Box>
            <Box>
              <Button
                color="secondary"
                variant="contained"
                disabled={!isDownloaded}
                onClick={() => {
                  emailDispatch({ type: "moveToCampaignPage:on" });
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

export default DownloadEmailCsvPane;
