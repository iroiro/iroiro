import React from "react";
import { Header } from "../../index";
import { Box } from "@material-ui/core";

import LogoButton from "../../atoms/LogoButton";
import LinkButton from "../../atoms/LinkButton";
import WalletButton from "../../atoms/WalletButton";

const AppHeader: React.FC = () => (
  <div>
    <Header>
      <Box ml={4}>
        <LogoButton />
      </Box>
      <Box display="flex">
        <LinkButton
          m={2}
          path="/dashboard"
          text="Token Distribution"
          color={"secondary"}
        />
        <LinkButton m={2} path="/explore" text="Explore" color={"primary"} />
        <Box mr={2}>
          <WalletButton />
        </Box>
      </Box>
    </Header>
    <hr color={"lightgray"} style={{ margin: "0px" }} />
  </div>
);

export default AppHeader;
