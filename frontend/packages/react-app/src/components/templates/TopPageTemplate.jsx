import React from "react";
import { Box, Flex } from "rimble-ui";
import AppHeader from "../molecules/AppHeader";
import TopPageBody from "../molecules/TopBody";

const TopPageTemplate = ({ provider, loadWeb3Modal　}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Flex m={"auto"} width={[1, 2/3]} height={"90vh"} style={{ alignItems: "center"}} >
      <TopPageBody/>
    </Flex>
  </div>
)

export default TopPageTemplate
