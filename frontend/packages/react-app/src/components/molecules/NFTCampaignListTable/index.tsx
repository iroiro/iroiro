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
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Campaigns } from "../../../interfaces";
import WalletButton from "../../atoms/WalletButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import { DistributorName } from "../CampaignListTable";

export interface NFTCampaignListTableProps {
  campaignsState: Campaigns;
  walletConnect: boolean;
}

const NFTCampaignListTable: React.FC<NFTCampaignListTableProps> = ({
  campaignsState,
  walletConnect,
}) => {
  return (
    <>
      <TitleWrapper
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TableTitle variant={"h4"}>Your Campaigns</TableTitle>
      </TitleWrapper>
      <Paper variant="outlined">
        <TableContainer>
          <Table style={{ minWidth: 680 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Distribution with</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!walletConnect && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ padding: 32, textAlign: "center" }}
                  >
                    If you want to see your campaigns, please connect to the
                    wallet
                    <ButtonWrapper mt={2} textAlign="center">
                      <WalletButton />
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              )}
              {walletConnect &&
                campaignsState.campaigns.length > 0 &&
                campaignsState.campaigns.map((campaign, index) => {
                  const pair = campaign.id.split("-");
                  return (
                    <TableRow key={campaign.id + index}>
                      {"campaignMetadata" in campaign ? (
                        <TableCell>
                          <Link
                            to={`/dashboard/nft/distributors/${pair[0]}/campaigns/${pair[1]}`}
                            style={{ textDecoration: "none", color: "#48C5D5" }}
                          >
                            <Typography variant={"body2"}>
                              {campaign.campaignMetadata.name}
                            </Typography>
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell>loading...</TableCell>
                      )}
                      <TableCell>
                        <DistributorName campaign={campaign} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {walletConnect && campaignsState.campaigns.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ padding: 32, textAlign: "center" }}
                  >
                    No Campaign
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

const ButtonWrapper = styled(Box)`
  & > div {
    display: block;
    text-align: center;
  }
`;

const TitleWrapper = styled(Box)`
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

const TableTitle = styled(Typography)`
  ${theme.breakpoints.down(600)} {
    margin-bottom: 12px;
  }
`;

export default NFTCampaignListTable;
