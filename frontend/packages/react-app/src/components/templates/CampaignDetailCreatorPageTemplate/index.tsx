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
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import CampaignDetailForCreator from "../../organisms/CampaignDetailForCreatorProps";
import { AccountToken, DistributorTypes } from "../../../interfaces";
import { CampaignData } from "../../../reducers/campaign";
import AppFrame from "../../organisms/AppFrame";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

export interface CampaignDetailCreatorPageTemplateProps {
  readonly tokenInfo: AccountToken;
  readonly campaignData: CampaignData;
  readonly distributorType: string;
  readonly campaignId: string;
  readonly tokenAddress: string;
  readonly distributorAddress: string;
}

export const getCampaignURL = (
  hasPrefix: boolean,
  distributorType: DistributorTypes,
  distributorAddress: string,
  campaignId: string,
  tokenAddress?: string
): string => {
  const prefix = hasPrefix
    ? `${window.location.origin}${window.location.pathname}#`
    : "";
  const path = () => {
    switch (distributorType) {
      case "wallet":
        return `/explore/token/${tokenAddress}/distributors/${distributorAddress}/campaigns/${campaignId}`;
      case "wallet-nft":
        return `/explore/nft/distributors/${distributorAddress}/campaigns/${campaignId}`;
    }
  };
  return `${prefix}${path()}`;
};

export const campaignNames: { [type: string]: string } = {
  wallet: "Wallet Address Campaign",
  "wallet-nft": "Wallet Address Campaign",
  uuid: "URL/Email Campaign",
  "uuid-nft": "URL/Email Campaign",
};

const CampaignDetailCreatorPageTemplate: React.FC<CampaignDetailCreatorPageTemplateProps> = ({
  campaignData,
  distributorType,
  campaignId,
  tokenAddress,
  distributorAddress,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickClipboard = () => {
    enqueueSnackbar("Copied", { variant: "success" });
  };

  return (
    <>
      <AppFrame>
        <Paper variant="outlined" style={{ border: "none" }}>
          <TypeWrapper>
            <Typography variant={"h3"}>
              {campaignNames[distributorType]}
            </Typography>
          </TypeWrapper>
          <Wrapper>
            <CampaignDetailForCreator
              campaignData={campaignData}
              distributorType={distributorType}
            />
            {(distributorType === "wallet-nft" ||
              distributorType === "wallet") && (
              <Box mt={4}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: "normal" }}
                >
                  Campaign page URL
                </Typography>
                <TextField
                  value={getCampaignURL(
                    true,
                    distributorType,
                    distributorAddress,
                    campaignId,
                    tokenAddress
                  )}
                  fullWidth
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CopyToClipboard
                          text={getCampaignURL(
                            true,
                            distributorType,
                            distributorAddress,
                            campaignId,
                            tokenAddress
                          )}
                        >
                          <IconButton onClick={handleClickClipboard}>
                            <AssignmentRoundedIcon />
                          </IconButton>
                        </CopyToClipboard>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          </Wrapper>
        </Paper>
      </AppFrame>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 40px 40px;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

const TypeWrapper = styled.div`
  padding: 40px 40px 0;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

export default CampaignDetailCreatorPageTemplate;
