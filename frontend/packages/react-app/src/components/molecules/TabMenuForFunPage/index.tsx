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
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

export interface TabMenuForFunPageProps {
  tokenAddress: string;
  current: "tokenTop" | "campaigns" | "userHistory";
}

export const TabMenuForFunPage: React.FC<TabMenuForFunPageProps> = ({
  tokenAddress,
  current,
}) => {
  const history = useHistory();
  const handleTokenTopClick = () => {
    history.push(`/explore/${tokenAddress}`);
  };

  const handleCampaignsClick = () => {
    history.push(`/explore/${tokenAddress}/campaigns`);
  };

  const handleUserHistoryClick = () => {
    history.push(`/explore/${tokenAddress}/history`);
  };

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
    </>
  );
};

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
