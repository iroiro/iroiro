import React from "react";
import AppHeader from "../molecules/AppHeader";
import TokenInfo from "../organisms/TokenInfo"

const TokenDetailePageTemplate = ({ provider, loadWeb3Modal, token, stakingInfo, withdrawStakingToken, claimEarnedToken, stakeToken, handleStakeInput, stakeValue }) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenInfo
      token={token}
      stakingInfo={stakingInfo}
      withdrawStakingToken={withdrawStakingToken}
      claimEarnedToken={claimEarnedToken}
      stakeToken={stakeToken}
      handleStakeInput={handleStakeInput}
      stakeValue={stakeValue}
    />
  </div>
)

export default TokenDetailePageTemplate
