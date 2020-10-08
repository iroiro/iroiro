import React from "react";
import {Header} from "../index";
import WalletButton from "../atoms/WalletButton";

const AppHeader = ({ provider, loadWeb3Modal}) => (
  <Header>
    <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
  </Header>
)

export default AppHeader
