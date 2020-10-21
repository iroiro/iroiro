import React from "react"
import { Box, Flex } from "rimble-ui"
import AppHeader from "../molecules/AppHeader"
import TopPageBody from "../molecules/TopBody"

const TopPageTemplate = ({ provider, loadWeb3Modal　}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box style={{ backgroundImage: `url(${window.location.origin}/top_bg.svg)`, backgroundSize: "contain"}}>
      <Flex m={"auto"} pb={5} width={[1, 2/3]} height={"100%"} style={{ alignItems: "center" }} >
        <TopPageBody/>
      </Flex>
    </Box>
  </div>
)

export default TopPageTemplate