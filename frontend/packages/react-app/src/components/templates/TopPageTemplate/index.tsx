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
import MenuButton from "../../atoms/MenuButton";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import SelectTokenModal from "../../organisms/SelectTokenModal";
import { useState } from "react";
import AppFrame from "../../organisms/AppFrame";
import { MenuButtonWrapper } from "../DashboardPageTemplate";

const TopPageTemplate = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleExploreButtonClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <AppFrame>
        <MenuButtonWrapper>
          <div style={{ marginBottom: 16 }}>
            <MenuButton
              title="TOKEN DISTRIBUTION"
              description="You can create a token distribution campaign. Let's set the tokens to be distributed and create a campaign."
              color="creator"
              onClick={() => history.push("/dashboard/token")}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <MenuButton
              title="NFT DISTRIBUTION"
              description="You can create a NFT distribution campaign. Let's set the NFT to be distributed and create a campaign."
              color="creator"
              onClick={() => history.push("/dashboard/nft")}
            />
          </div>
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          <div style={{ marginBottom: 16 }}>
            <MenuButton
              title="TOKEN EXPLORE"
              description="Check the status of the tokens you have been distributed and information on the campaign."
              color="user"
              onClick={handleExploreButtonClick}
            />
          </div>
          <div>
            <MenuButton
              title="NFT EXPLORE"
              description="Check the status of the NFTs you have been distributed and information on the campaign."
              color="user"
              onClick={() => history.push("/explore/nft/campaigns")}
            />
          </div>
        </MenuButtonWrapper>
      </AppFrame>
      <SelectTokenModal
        open={open}
        onCloseModal={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default TopPageTemplate;
