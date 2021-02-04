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
import { Box, Typography, Card } from "@material-ui/core";
import { TokenAndCampaignProps } from "../../../interfaces";
import LinkButton from "../../atoms/LinkButton";
import CampaignListTable from "../../molecules/CampaignListTable";
import { TitleBox } from "./style";

const CampaignList: React.FC<TokenAndCampaignProps> = ({
  tokenState,
  campaignsState,
}) => {
  return (
    <>
      <TitleBox
        style={{ alignItems: "center", justifyContent: "space-between" }}
        my={1}
      >
        <Typography variant={"h3"}>{tokenState.token?.name}</Typography>
        <LinkButton
          m={0}
          path={`/dashboard/${tokenState.token?.tokenAddress}/distributors`}
          text="+ Create New Campaign"
          color="secondary"
        ></LinkButton>
      </TitleBox>
      <Card>
        <CampaignListTable
          tokenState={tokenState}
          campaignsState={campaignsState}
        />
      </Card>
    </>
  );
};

export default CampaignList;
