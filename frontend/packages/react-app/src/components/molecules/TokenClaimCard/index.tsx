import * as React from "react";
import { Button, Card, CardContent, Typography, Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { useClaim } from "../../../hooks/distributors/audius-followers/useClaim";
import { useCallback } from "react";
import { AudiusState } from "../../../reducers/audius";
import TokenAmount from "../../atoms/TokenAmount";

export interface TokenClaimCardProps {
  campaignAddress: string;
  symbol: string;
  claimAmount: string;
  isClaimable: boolean;
  isClaimed: boolean;
  userAddress: string;
  decimals: number;
  readonly audiusState: AudiusState;
}

const TokenClaimCard: React.FC<TokenClaimCardProps> = ({
  campaignAddress,
  symbol,
  claimAmount,
  isClaimable,
  isClaimed,
  userAddress, // TODO enable switching Audius address and web wallet address
  decimals,
  audiusState,
}) => {
  const { library } = useWeb3React();
  const claim = useClaim(
    library,
    campaignAddress,
    audiusState.libs,
    userAddress
  );
  const onClickClaim = useCallback(async () => {
    const transaction = await claim();
    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [claim]);

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

export default TokenClaimCard;
