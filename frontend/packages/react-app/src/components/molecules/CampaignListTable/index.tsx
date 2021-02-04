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
import { TokenAndCampaignProps, CampaignInfo } from "../../../interfaces";
import distributors from "../../../utils/distributors";

interface DistributorProps {
  campaign: CampaignInfo;
}

function DistributorName(props: DistributorProps) {
  const { campaign } = props;
  const result = distributors.filter(
    (distributor) => distributor.id === campaign.distributor.id
  );

  return <Typography>{result[0].distributorMetadata.name}</Typography>;
}

const CampaignListTable: React.FC<TokenAndCampaignProps> = ({
  tokenState,
  campaignsState,
}) => {
  return (
    <>
      {campaignsState.campaigns.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Startdate</TableCell>
                <TableCell>Distributor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaignsState.campaigns.length > 0 &&
                campaignsState.campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    {"campaignMetadata" in campaign ? (
                      <TableCell>
                        <Link
                          to={`/dashboard/${tokenState.token?.tokenAddress}/distributors/${campaign.distributor.id}/campaigns/${campaign.id}`}
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
                    <TableCell>{campaign.claimAmount}</TableCell>
                    <TableCell>
                      {new Date(
                        parseInt(campaign.startDate)
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DistributorName campaign={campaign} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box style={{ textAlign: "center" }} py={5}>
          <Typography>No Campaign</Typography>
        </Box>
      )}
    </>
  );
};

export default CampaignListTable;
