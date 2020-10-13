import React from "react";
import { Heading } from "rimble-ui";
import AppHeader from "../molecules/AppHeader";
import CreatedTokenInfo from "../organisms/CreatedTokenInfo";

const ExplorePageTemplate = ({ provider, loadWeb3Modal, vestingAmount, tokens, withdrawToken}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Heading as={"h2"}>Created Tokens</Heading>
    {tokens.map(token => 
      <CreatedTokenInfo
        key={token.address}
        vestingAmount={vestingAmount}
        token={token}
        withdrawToken={withdrawToken}
      />
    )}
  </div>
)

export default ExplorePageTemplate
