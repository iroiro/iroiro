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
import { FormControl, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import theme from "../../../theme/mui-theme";

export interface TabMenuForFunPageProps {
  tokenAddress: string;
  current: "tokenTop" | "campaigns" | "userHistory";
}

export const TabMenuForFunPage: React.FC<TabMenuForFunPageProps> = ({
  tokenAddress,
  current,
}) => {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(current);
  const handleTokenTopClick = () => {
    history.push(`/explore/token/${tokenAddress}`);
  };

  const handleCampaignsClick = () => {
    history.push(`/explore/token/${tokenAddress}/campaigns`);
  };

  const handleUserHistoryClick = () => {
    history.push(`/explore/token/${tokenAddress}/history`);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTabValue(event.target.value as "tokenTop" | "campaigns" | "userHistory");
  };

  useEffect(() => {
    if (tabValue === current) {
      return;
    }

    switch (tabValue) {
      case "tokenTop":
        history.push(`/explore/token/${tokenAddress}`);
        break;
      case "campaigns":
        history.push(`/explore/token/${tokenAddress}/campaigns`);
        break;
      case "userHistory":
        history.push(`/explore/token/${tokenAddress}/history`);
        break;
      default:
        return;
    }
  }, [tabValue]);

  return (
    <>
      <TabWrapper>
        <Tab current={current === "tokenTop"} onClick={handleTokenTopClick}>
          TOKEN TOP
        </Tab>
        <Tab current={current === "campaigns"} onClick={handleCampaignsClick}>
          CAMPAIGNS
        </Tab>
        <Tab
          current={current === "userHistory"}
          onClick={handleUserHistoryClick}
        >
          USER HISTORY
        </Tab>
        <DisabledTab>🚧 CREATOR LOG</DisabledTab>
        <DisabledTab>🚧 DONATION</DisabledTab>
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
            <MenuItem value={"tokenTop"}>Token Top</MenuItem>
            <MenuItem value={"campaigns"}>Campaigns</MenuItem>
            <MenuItem value={"userHistory"}>User History</MenuItem>
            <MenuItem disabled>🚧 CREATOR LOG</MenuItem>
            <MenuItem disabled>🚧 DONATION</MenuItem>
          </Select>
        </FormControl>
      </SPMenuWrapper>
    </>
  );
};

const SPMenuWrapper = styled.div`
  display: none;
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${theme.breakpoints.down(760)} {
    margin: 0 -42px;
  }
  ${theme.breakpoints.down(600)} {
    display: none;
  }
`;

const tabStyle = css`
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
  width: 20%;
  text-align: center;
  background-color: #fff;
  font-size: 0.875rem;
  cursor: pointer;
  transition: 0.3s;
  margin: 0 4px;
  height: 35px;
  line-height: 35px;
  &:hover {
    opacity: 0.5;
    transition: 0.3s;
  }
  ${theme.breakpoints.down(760)} {
    margin: 0 2px;
  }
`;

const Tab = styled.div<{ current: boolean }>`
  ${tabStyle}
  color: ${(props) => (props.current ? "#D06689" : "#000")};
  height: ${(props) => (props.current ? "40px" : "35px")};
  font-weight: ${(props) => (props.current ? "bold" : "300")};
`;

const DisabledTab = styled.div`
  ${tabStyle}
  color: #c4c4c4;
  cursor: inherit;

  &:hover {
    opacity: 1;
  }
`;
