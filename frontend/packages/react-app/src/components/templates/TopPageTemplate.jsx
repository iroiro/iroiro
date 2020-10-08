import React from "react";
import AppHeader from "../molecules/AppHeader";
import logo from "../../ethereumLogo.png";
import TopPageBody from "../organisms/Body";

const TopPageTemplate = ({ provider, loadWeb3Modal, readOnChainData}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TopPageBody
      logo={logo}
      readOnChainData={readOnChainData}
    />
  </div>
)

export default TopPageTemplate
