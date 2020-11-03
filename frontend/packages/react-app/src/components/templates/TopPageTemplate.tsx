import React from "react"
import { Box, Flex } from "rimble-ui"
import AppHeader from "../molecules/AppHeader"
import TopPageBody from "../molecules/TopBody"
import { Web3Props } from "../../interfaces";

const TopPageTemplate = ({ provider, loadWeb3Modal　}: Web3Props) => (
  <div style={{minHeight:"100vh"}}>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box style={{ minHeight: "100vh", backgroundImage: `url(${window.location.origin}/top_bg.svg)`, backgroundSize: "contain"}}>
      <Flex m={"auto"} py={5} width={[1, 2/3]} style={{ alignItems: "center" }} >
        <TopPageBody/>
      </Flex>
    </Box>
  </div>
)

export default TopPageTemplate