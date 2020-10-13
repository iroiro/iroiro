import React from "react";
import { Heading } from "rimble-ui";
import AppHeader from "../molecules/AppHeader";
import CreatedTokenInfo from "../organisms/CreatedTokenInfo";

const ExplorePageTemplate = ({ provider, loadWeb3Modal, path, name, vestingAmount}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Heading as={"h2"}>Created Tokens</Heading>
    <CreatedTokenInfo
      path={path}
      name={name}
      vestingAmount={vestingAmount}
    />
  </div>
)

export default ExplorePageTemplate
