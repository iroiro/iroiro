import React from "react";
import AppHeader from "../molecules/AppHeader";
import { Body } from "../index";
import TokenList from "../organisms/TokenList";

const ExplorePageTemplate = ({ provider, loadWeb3Modal, tokens}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenList
      tokens={tokens}
    />
  </div>
)

export default ExplorePageTemplate
