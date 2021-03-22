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
import TokenInfoBar from "../../molecules/TokenInfoBar";
import MenuButton from "../../atoms/MenuButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import AppFrame from "../../organisms/AppFrame";

export interface ExplorePageTemplateProps {
  tokenAddress: string;
}

const ExplorePageTemplate: React.FC<ExplorePageTemplateProps> = ({
  tokenAddress,
}: ExplorePageTemplateProps) => {
  const history = useHistory();
  const handleCampaignsClick = useCallback(() => {
    history.push(`/explore/token/${tokenAddress}/campaigns`);
  }, [history, tokenAddress]);
  const handleUserHistoryClick = useCallback(() => {
    history.push(`/explore/token/${tokenAddress}/history`);
  }, [history, tokenAddress]);
  return (
    <>
      <AppFrame>
        <TokenInfoBar />
        <div>
          <ButtonWrapper>
            <MenuButton
              title={"Campaigns"}
              description={"You can see a list of campaigns that are going on."}
              color="user"
              onClick={handleCampaignsClick}
            />
            <MenuButton
              title={"User History"}
              description={"You can check the balance activities."}
              color="user"
              onClick={handleUserHistoryClick}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <MenuButton
              title={"🚧 Creator Log"}
              description={"Coming Soon"}
              color="user"
              disabled={true}
            />
            <MenuButton
              title={"🚧 Donation"}
              description={"Coming Soon"}
              color="user"
              disabled={true}
            />
          </ButtonWrapper>
        </div>
      </AppFrame>
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  & > div {
    width: 49.5%;
    ${theme.breakpoints.down(600)} {
      width: 100%;
      margin-bottom: 8px;
    }
  }
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export default ExplorePageTemplate;
