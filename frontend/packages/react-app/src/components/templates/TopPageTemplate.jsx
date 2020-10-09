import React from "react";
import AppHeader from "../molecules/AppHeader";
import TopPageBody from "../molecules/TopBody";

const TopPageTemplate = ({ provider, loadWeb3Modal　}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TopPageBody/>
  </div>
)

export default TopPageTemplate
