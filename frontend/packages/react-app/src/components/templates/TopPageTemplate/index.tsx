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
import styled from "styled-components";
import MenuButton from "../../atoms/MenuButton";
import { AppFooter } from "../../molecules/AppFooter";
import AppHeader from "../../molecules/AppHeader";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import SelectTokenModal from "../../organisms/SelectTokenModal";
import { useState } from "react";

const TopPageTemplate = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleDistributionButtonClick = useCallback(() => {
    history.push("/dashboard");
  }, []);
  const handleExploreButtonClick = useCallback(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <AppHeader />
      <ButtonWrapper>
        <div style={{ marginBottom: 16 }}>
          <MenuButton
            title="DISTRIBUTION"
            description="You can create a token distribution campaign. Let's set the tokens to be distributed and create a campaign."
            color="creator"
            onClick={handleDistributionButtonClick}
          />
        </div>
        <div>
          <MenuButton
            title="EXPLORE"
            description="Check the status of the tokens you have been distributed and information on the campaign."
            color="user"
            onClick={handleExploreButtonClick}
          />
        </div>
      </ButtonWrapper>
      <AppFooter />
      <SelectTokenModal
        open={open}
        onCloseModal={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

const ButtonWrapper = styled.div`
  max-width: 390px;
  margin: 0 auto 32px;
  padding-top: 4%;
`;

export default TopPageTemplate;
