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
import { useEffect } from "react";
import { FormControl, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { SPMenuWrapper, Tab, TabWrapper } from "../TabMenuForFunPage";

export type NFTTabType = "campaigns" | "userHistory";

export interface NFTTabMenuForFunPageProps {
  current: NFTTabType;
}

export const NFTTabMenuForFunPage: React.FC<NFTTabMenuForFunPageProps> = ({
  current,
}) => {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(current);

  const handleCampaignsClick = () => {
    history.push(`/explore/nft/campaigns`);
  };

  const handleUserHistoryClick = () => {
    history.push(`/explore/nft/history`);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTabValue(event.target.value as "campaigns" | "userHistory");
  };

  useEffect(() => {
    if (tabValue === current) {
      return;
    }

    switch (tabValue) {
      case "campaigns":
        history.push(`/explore/nft/campaigns`);
        break;
      case "userHistory":
        history.push(`/explore/nft/history`);
        break;
      default:
        return;
    }
  }, [tabValue]);

  return (
    <>
      <TabWrapper>
        <Tab current={current === "campaigns"} onClick={handleCampaignsClick}>
          NEW CAMPAIGNS
        </Tab>
        <Tab
          current={current === "userHistory"}
          onClick={handleUserHistoryClick}
        >
          CLAIMED
        </Tab>
      </TabWrapper>
      <SPMenuWrapper>
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel id="menu-label">Menu</InputLabel>
          <Select
            label="Menu"
            labelId="menu-label"
            value={tabValue}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 16 }}
          >
            <MenuItem value={"campaigns"}>New Campaigns</MenuItem>
            <MenuItem value={"userHistory"}>Claimed</MenuItem>
          </Select>
        </FormControl>
      </SPMenuWrapper>
    </>
  );
};
