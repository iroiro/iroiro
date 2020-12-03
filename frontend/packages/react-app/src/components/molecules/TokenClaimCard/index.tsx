import * as React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";

export interface TokenClaimCardProps {}

const TokenClaimCard = ({}: TokenClaimCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Button variant="contained" color="primary">
          Claim
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenClaimCard;
