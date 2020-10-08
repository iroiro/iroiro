import React from "react";
import { Header } from "../index";
import LogoButton from "../atoms/LogoButton"
import LinkOutlineButton from "../atoms/LinkOutlineButton"
import WalletButton from "../atoms/WalletButton";

const AppHeader = ({ provider, loadWeb3Modal}) => (
  <Header>
    <LogoButton />
    <div>
      <LinkOutlineButton p={4} path="create" text="Create" />
      <LinkOutlineButton p={4} path="explore" text="Explore" />
      <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
    </div>
  </Header>
)

export default AppHeader
