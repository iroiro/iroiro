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
import { CampaignInfo, Campaigns } from "../../../interfaces";
import distributors, { getDistributorType } from "../../../utils/distributors";
import WalletButton from "../../atoms/WalletButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import SelectTokenInput, { TokenOption } from "../../atoms/SelectTokenInput";
import { useState } from "react";
import { useEffect } from "react";
import TokenAmount from "../../atoms/TokenAmount";
import { TokenState } from "../../../reducers/tokenContext";

interface DistributorProps {
  campaign: CampaignInfo;
}

function DistributorName(props: DistributorProps) {
  const { campaign } = props;
  const result = distributors.find(
    (distributor) =>
      distributor.id.toLowerCase() === campaign.distributor.id.toLowerCase()
  );

  return <Typography>{getDistributorType(result?.type ?? "")}</Typography>;
}

export interface CampaignListTableProps {
  campaignsState: Campaigns;
  walletConnect: boolean;
  tokenState: TokenState;
}

const CampaignListTable: React.FC<CampaignListTableProps> = ({
  campaignsState,
  walletConnect,
  tokenState,
}) => {
  const [value, setValue] = useState<TokenOption>({
    tokenName: "",
    tokenAddress: "",
  });

  const [displayedList, setDisplayedList] = useState(campaignsState.campaigns);

  useEffect(() => {
    if (campaignsState.campaigns.length == 0) {
      return;
    }
    if (value === null) {
      setDisplayedList(campaignsState.campaigns);
      return;
    }

    if (value.tokenName === "") {
      setDisplayedList(campaignsState.campaigns);
      return;
    }

    const filteredList = campaignsState.campaigns.filter((campaign) => {
      return (
        // TODO remove type assertion
        (campaign.token as string).toLowerCase() ===
        value.tokenAddress.toLowerCase()
      );
    });
    setDisplayedList(filteredList);
  }, [value, campaignsState.campaigns]);

  return (
    <>
      <TitleWrapper
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant={"h4"}>Your Campaigns</Typography>
        {walletConnect && displayedList.length > 0 && (
          <div>
            <SelectTokenInput
              label={
                tokenState.tokens.length === 0
                  ? "Please Wait...⏳"
                  : "Filtered by Token"
              }
              options={tokenState.tokens}
              value={value}
              onChange={(value: TokenOption) => setValue(value)}
              disabled={tokenState.tokens.length === 0}
              small
              color="creator"
            />
          </div>
        )}
      </TitleWrapper>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Token</TableCell>
                <TableCell>Distributor</TableCell>
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
                displayedList.length > 0 &&
                displayedList.map((campaign, index) => {
                  const token = tokenState.tokenBasicInfoList.find(
                    (tokenBasic) => tokenBasic.tokenAddress === campaign.token
                  );
                  return (
                    <TableRow key={campaign.id + index}>
                      {"campaignMetadata" in campaign ? (
                        <TableCell>
                          <Link
                            to={`/dashboard/${campaign.token}/distributors/${campaign.distributor.id}/campaigns/${campaign.id}`}
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
                        <TokenAmount
                          amount={campaign.claimAmount}
                          decimals={token?.decimals ?? 0}
                          symbol={token?.symbol ?? ""}
                          align="inherit"
                          variant="body2"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(
                          parseInt(campaign.startDate) * 1000
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {tokenState.tokens.find(
                          (creatorOption) =>
                            creatorOption.tokenAddress.toLowerCase() ===
                            campaign.token
                        )?.tokenName ?? "..."}
                      </TableCell>
                      <TableCell>
                        <DistributorName campaign={campaign} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {walletConnect && displayedList.length === 0 && (
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

export default CampaignListTable;
