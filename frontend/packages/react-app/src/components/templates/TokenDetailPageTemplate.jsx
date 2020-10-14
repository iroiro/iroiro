import React from "react";
import AppHeader from "../molecules/AppHeader";
import TokenInfo from "../organisms/TokenInfo"

const TokenDetailePageTemplate = ({ provider, loadWeb3Modal, token}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenInfo
      token={token}
    />
  </div>
)

export default TokenDetailePageTemplate
