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

import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import * as React from "react";
import styled from "styled-components";
import LogoButton from "../../atoms/LogoButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import Tooltip from "@material-ui/core/Tooltip";
import theme from "../../../theme/mui-theme";

export const AppFooter = () => {
  return (
    <FooterContainer>
      <Wrapper>
        <p style={{ paddingRight: 10 }}>
          <Link
            href="https://twitter.com/IroiroTokens"
            target="_blank"
            rel="noopener"
          >
            <Tooltip title="Twitter" arrow>
              <TwitterIcon />
            </Tooltip>
          </Link>
        </p>
        <p style={{ padding: 10 }}>
          <Link
            href="https://github.com/iroiro/iroiro"
            target="_blank"
            rel="noopener"
          >
            <Tooltip title="GitHub" arrow>
              <GitHubIcon />
            </Tooltip>
          </Link>
        </p>
        <p style={{ padding: 10 }}>
          <Link
            href="https://www.notion.so/tart/iroiro-social-b22f75bbd85e4ad0afa3dd8775a02995"
            target="_blank"
            rel="noopener"
          >
            <Tooltip title="Doc" arrow>
              <DescriptionIcon />
            </Tooltip>
          </Link>
        </p>
        <p style={{ padding: 10 }}>
          <Link
            href="https://medium.com/iroiro-social-token"
            target="_blank"
            rel="noopener"
          >
            <Tooltip title="Medium" arrow>
              <div
                style={{
                  backgroundColor: theme.palette.primary.main,
                  width: 30,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/Medium-Symbol-White-RGB@2x.png"
                  alt="Medium icon"
                  style={{ width: 30 }}
                />
              </div>
            </Tooltip>
          </Link>
        </p>
      </Wrapper>
      <LogoButtonWrapper>
        <LogoButton />
      </LogoButtonWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  padding: 0 32px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoButtonWrapper = styled.div`
  & img {
    width: 70px;
  }
`;
