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
import { Box, Typography, Button, Container, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import AppHeader from "../../molecules/AppHeader";
import CampaignDetail from "../../organisms/CampaignDetail";
import { AccountToken } from "../../../interfaces";
import { CampaignData } from "../../../reducers/campaign";
import { ACTIONS } from "../../../reducers/campaign";
import { AppFooter } from "../../molecules/AppFooter";
import AppFrame from "../../organisms/AppFrame";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface CampaignInfoProps {
  readonly tokenInfo: AccountToken;
  readonly targetNumber: string;
  readonly campaignData: CampaignData;
  campaignDispatch: React.Dispatch<ACTIONS>;
  readonly distributorType: string;
}

const ColorButton = withStyles(() => ({
  root: {
    color: red[500],
    borderColor: red[500],
  },
}))(Button);

const campaignNames: { [type: string]: string } = {
  wallet: "Wallet Address Campaign",
  uuid: "URL Campaign",
  audius: "Audius Follower Campaign",
};

const CampaignDetailPageTemplate: React.FC<CampaignInfoProps> = ({
  targetNumber,
  campaignData,
  campaignDispatch,
  distributorType,
}) => (
  <>
    <AppFrame>
      <Paper variant="outlined" style={{ border: "none" }}>
        <div style={{ padding: "40px 40px 0" }}>
          <Typography variant={"h3"}>
            {campaignNames[distributorType]}
          </Typography>
        </div>
        <Wrapper>
          <CampaignDetail
            campaignData={campaignData}
            targetNumber={targetNumber}
          />
        </Wrapper>
        <Box style={{ textAlign: "center", borderTop: "2px solid #F8F8F8" }}>
          {campaignData.campaign.status === 0 && !campaignData.canRefund && (
            <ButtonWrapper>
              <ColorButton
                variant="outlined"
                size="small"
                onClick={() =>
                  campaignDispatch({
                    type: "campaign:cancel",
                    payload: { data: true },
                  })
                }
              >
                Cancel campaign
              </ColorButton>
            </ButtonWrapper>
          )}
          {campaignData.canRefund && (
            <ButtonWrapper>
              <Button
                size="small"
                color="secondary"
                onClick={() =>
                  campaignDispatch({
                    type: "campaign:refund",
                    payload: { data: true },
                  })
                }
              >
                End campaign and refund tokens
              </Button>
            </ButtonWrapper>
          )}
        </Box>
      </Paper>
    </AppFrame>
  </>
);

const Wrapper = styled.div`
  padding: 20px 40px 40px;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

const ButtonWrapper = styled.div`
  padding: 40px;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

export default CampaignDetailPageTemplate;
