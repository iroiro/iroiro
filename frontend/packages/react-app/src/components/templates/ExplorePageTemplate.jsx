import React from "react";
import AppHeader from "../molecules/AppHeader";
import { Body } from "../index";
import TokenList from "../organisms/TokenList";

const ExplorePageTemplate = ({ provider, loadWeb3Modal, readOnChainData, name, balance, symbol}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenList
      name={name}
      balance={balance}
      symbol={symbol}
    />
  </div>
)

export default ExplorePageTemplate
