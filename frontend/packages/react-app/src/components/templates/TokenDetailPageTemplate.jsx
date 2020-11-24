import React from "react";
import { Box } from "rimble-ui";
import Index from "../molecules/AppHeader";
import TokenInfo from "../organisms/TokenInfo";

const TokenDetailePageTemplate = ({
  token,
  approve,
  stakingInfo,
  withdrawStakingToken,
  claimEarnedToken,
  stakeToken,
  handleStakeInput,
  stakeValue,
}) => (
  <div>
    <Index />
    <Box m={"auto"} my={5} width={[3 / 4, 2 / 3]}>
      <TokenInfo
        token={token}
        stakingInfo={stakingInfo}
        withdrawStakingToken={withdrawStakingToken}
        claimEarnedToken={claimEarnedToken}
        approve={approve}
        stakeToken={stakeToken}
        handleStakeInput={handleStakeInput}
        stakeValue={stakeValue}
      />
    </Box>
  </div>
);

export default TokenDetailePageTemplate;
