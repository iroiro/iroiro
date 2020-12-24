import * as React from "react";
import { Button, Card, CardContent, Typography, Box } from "@material-ui/core";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useClaim } from "../../../hooks/distributors/audius-followers/useClaim";
import { useCallback } from "react";

export interface TokenClaimCardProps {
  campaignAddress: string;
  symbol: string;
  claimAmount: string;
  isClaimable: boolean;
  isClaimed: boolean;
}

const TokenClaimCard: React.FC<TokenClaimCardProps> = ({
  campaignAddress,
  symbol,
  claimAmount,
  isClaimable,
  isClaimed,
}) => {
  const { library } = useWeb3React();
  const claim = useClaim(library, campaignAddress);
  const onClickClaim = useCallback(async () => {
    const transaction = await claim();
    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [claim]);

  const text = isClaimable
    ? "You can claim token."
    : "We are sorry but you can not claim token.";

  return (
    <Card>
      <CardContent>
        <Box my={4}>
          <Typography align="center">{text}</Typography>
          {isClaimable && (
            <>
              <Box my={2}>
                <Typography align="center" variant="h2">
                  {`${claimAmount} $${symbol}`}
                </Typography>
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
