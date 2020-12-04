import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

export interface TokenRequestCardProps {
  isApproved: boolean;
  isRequested: boolean;
}

const TokenRequestCard = ({
  isApproved,
  isRequested,
}: TokenRequestCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Button variant="contained" color="primary" disabled={isApproved}>
          Approve $LINK
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isApproved && isRequested}
        >
          Check request
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenRequestCard;
