import React from "react"
import { Box } from "rimble-ui"
import AppHeader from "../molecules/AppHeader"
import TokenList from "../organisms/TokenList"

const ExplorePageTemplate = ({ provider, loadWeb3Modal, tokens}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box m={"auto"} mt={5} width={[4/5, 3/4]} >
      <TokenList
        tokens={tokens}
      />
    </Box>
  </div>
)

export default ExplorePageTemplate
