import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

export interface TokenRequestCardProps {}

const TokenRequestCard = ({}: TokenRequestCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Button variant="contained" color="primary">
          Approve $LINK
        </Button>
        <Button variant="contained" color="primary">
          Check request
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenRequestCard;
