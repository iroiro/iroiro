import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

export interface TokenClaimCardProps {
  symbol: string;
  claimAmount: string;
  isClaimable: boolean;
  isClaimed: boolean;
}

const BtnWrapper = styled.div`
  text-align: center;
  margin-top: 4px;
`;

const TokenClaimCard: React.FC<TokenClaimCardProps> = ({
  symbol,
  claimAmount,
  isClaimable,
  isClaimed,
}) => {
  const text = isClaimable
    ? "You can claim token."
    : "We are sorry but you can not claim token.";

  return (
    <Card>
      <CardContent>
        <Typography align="center">{text}</Typography>
        {isClaimable && (
          <>
            <Typography align="center" variant="h4">
              {`${claimAmount} $${symbol}`}
            </Typography>
            <BtnWrapper>
              <Button variant="contained" color="primary" disabled={isClaimed}>
                {isClaimed ? "Claimed" : "Claim"}
              </Button>
            </BtnWrapper>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenClaimCard;
