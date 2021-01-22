import * as React from "react";
import { Button, Card, CardContent, Typography, Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Dispatch, useCallback } from "react";
import TokenAmount from "../../atoms/TokenAmount";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import { walletClaim } from "../../../utils/web3";

export interface WalletTokenClaimCardProps {
  campaignAddress: string;
  symbol: string;
  claimAmount: string;
  isClaimable: boolean;
  isClaimed: boolean;
  decimals: number;
  readonly dispatch: Dispatch<TokenInformationAction>;
  merkleTreeCid: string;
}

const WalletTokenClaimCard: React.FC<WalletTokenClaimCardProps> = ({
  campaignAddress,
  symbol,
  claimAmount,
  isClaimable,
  isClaimed,
  decimals,
  dispatch,
  merkleTreeCid,
}) => {
  const { library } = useWeb3React();

  const onClickClaim = useCallback(async () => {
    const transaction = await walletClaim(
      library,
      campaignAddress,
      merkleTreeCid
    );

    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    dispatch({ type: "isCampaignClaimed:setTrue" });
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [dispatch]);

  let text = "We are sorry but you can not claim token.";
  if (isClaimable) {
    text = "You can claim token.";
  }
  if (isClaimed) {
    text = "You claimed token.";
  }
  return (
    <Card>
      <CardContent>
        <Box my={4}>
          <Typography align="center">{text}</Typography>
          {isClaimable && (
            <>
              <Box my={2}>
                <TokenAmount
                  amount={claimAmount}
                  decimals={decimals}
                  align="center"
                  variant="h2"
                  symbol={symbol}
                />
              </Box>
              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isClaimed}
                  onClick={onClickClaim}
                >
                  {isClaimed ? "Claimed" : "Claim"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletTokenClaimCard;
