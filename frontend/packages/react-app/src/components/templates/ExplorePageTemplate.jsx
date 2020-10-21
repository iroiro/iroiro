import React from "react"
import { Box } from "rimble-ui"
import AppHeader from "../molecules/AppHeader"
import TokenList from "../organisms/TokenList"

const ExplorePageTemplate = ({ provider, loadWeb3Modal, tokens, loading}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box m={"auto"} my={5} width={[4/5, 3/4]} >
      <TokenList
        tokens={tokens}
        loading={loading}
      />
    </Box>
  </div>
)

export default ExplorePageTemplate
