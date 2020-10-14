import React from "react";
import AppHeader from "../molecules/AppHeader";
import TokenInfo from "../organisms/TokenInfo"

const TokenDetailePageTemplate = ({ provider, loadWeb3Modal, token, stakingInfo, withdrawEarnedToken, stakeToken, handleStakeInput, stakeValue }) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenInfo
      token={token}
      stakingInfo={stakingInfo}
      withdrawEarnedToken={withdrawEarnedToken}
      stakeToken={stakeToken}
      handleStakeInput={handleStakeInput}
      stakeValue={stakeValue}
    />
  </div>
)

export default TokenDetailePageTemplate
