import React from "react";
import { Box, Typography, Link, IconButton } from "@material-ui/core";
import LogoButton from "../../atoms/LogoButton";
import LinkButton from "../../atoms/LinkButton";
import WalletButton from "../../atoms/WalletButton";
import {
  Header,
  IconBox,
  SpMenuBox,
  PcMenuBox,
  LogoBox,
  WalletButtonBox,
  SpMenuWrapper,
} from "./style";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const AppHeader: React.FC = () => {
  const [show, setShow] = useState(false);

  const Menu = (
    <>
      <LinkButton
        m={1}
        path="/dashboard"
        text="Distribution"
        color={"secondary"}
      />
      <LinkButton m={1} path="/explore" text="Explore" color={"primary"} />
      <WalletButtonBox mr={1}>
        <WalletButton />
      </WalletButtonBox>
    </>
  );

  return (
    <div>
      <Box
        bgcolor={"primary.main"}
        style={{ textAlign: "center", minWidth: 320 }}
        py={1}
      >
        <Typography style={{ color: "white", fontSize: 12 }}>
          🎨 Beta - Use at your own risk. Twitter:
          <Link
            href={"https://twitter.com/IroiroTokens"}
            style={{ color: "white" }}
          >
            @IroiroTokens
          </Link>
          🎨
        </Typography>
      </Box>
      <Header>
        <LogoBox>
          <LogoButton />
        </LogoBox>
        <IconBox>
          <IconButton aria-label="menu" onClick={() => setShow(!show)}>
            {show && <CloseIcon />}
            {!show && <MenuIcon />}
          </IconButton>
        </IconBox>

        <SpMenuWrapper style={{ paddingBottom: show ? 180 : 0 }}>
          <SpMenuBox style={{ opacity: show ? 1 : 0 }}>{Menu}</SpMenuBox>
        </SpMenuWrapper>

        <PcMenuBox display={"flex"}>{Menu}</PcMenuBox>
      </Header>
      <hr color={"lightgray"} style={{ margin: "0px" }} />
    </div>
  );
};

export default AppHeader;
