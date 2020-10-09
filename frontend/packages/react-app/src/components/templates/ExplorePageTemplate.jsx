import React from "react";
import AppHeader from "../molecules/AppHeader";
import { Body } from "../index";
import TokenList from "../molecules/TokenList";

const ExplorePageTemplate = ({ provider, loadWeb3Modal, readOnChainData}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenList/>
  </div>
)

export default ExplorePageTemplate
