import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

export interface TokenRequestCardProps {
  tokenApproved: boolean;
  requested: boolean;
}

const TokenRequestCard = ({
  tokenApproved,
  requested,
}: TokenRequestCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Button variant="contained" color="primary" disabled={tokenApproved}>
          Approve $LINK
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={tokenApproved && requested}
        >
          Check request
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenRequestCard;
