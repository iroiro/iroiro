import React from "react";
import { Header } from "../../index";
import { Box, Flex } from "rimble-ui";

import LogoButton from "../../atoms/LogoButton";
import LinkButton from "../../atoms/LinkButton";
import WalletButton from "../../atoms/WalletButton";

const AppHeader = () => (
  <div>
    <Header>
      <Box ml={4}>
        <LogoButton />
      </Box>
      <Flex>
        <LinkButton
          p={4}
          path="/dashboard"
          text="Dashboard"
          mainColor={"itblue"}
        />
        <LinkButton p={4} path="/explore" text="Explore" mainColor={"itred"} />
        <WalletButton />
      </Flex>
    </Header>
    <hr color={"lightgray"} style={{ margin: "0px" }} />
  </div>
);

export default AppHeader;
