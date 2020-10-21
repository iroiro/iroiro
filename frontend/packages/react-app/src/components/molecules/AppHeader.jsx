import React from "react";
import { Header } from "../index";
import { Box, Button } from "rimble-ui";

import LogoButton from "../atoms/LogoButton"
import LinkButton from "../atoms/LinkButton"
import WalletButton from "../atoms/WalletButton";

const AppHeader = ({ provider, loadWeb3Modal}) => (
  <div>
    <Header>
      <Box ml={4}>
        <LogoButton />
      </Box>
      <div>
        <LinkButton p={4} path="dashboard" text="Dashboard" mainColor={"#E25E89"}/>
        <LinkButton p={4} path="explore" text="Explore" mainColor={"#48C5D5"}/>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
      </div>
    </Header>
    <hr color={"lightgray"} style={{margin: "0px"}}/>
  </div>

)

export default AppHeader
