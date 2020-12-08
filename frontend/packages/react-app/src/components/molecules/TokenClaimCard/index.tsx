import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

export interface TokenClaimCardProps {
  isClaimable: boolean;
  isClaimed: boolean;
}

const TokenClaimCard: React.FC<TokenClaimCardProps> = ({
  isClaimable,
  isClaimed,
}) => {
  if (!isClaimable && !isClaimed) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography>
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Button variant="contained" color="primary" disabled={isClaimed}>
          {isClaimed ? "Claimed" : "Claim"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenClaimCard;
