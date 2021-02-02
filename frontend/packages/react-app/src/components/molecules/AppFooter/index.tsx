import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import * as React from "react";
import styled from "styled-components";
import LogoButton from "../../atoms/LogoButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import Tooltip from "@material-ui/core/Tooltip";

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
