import * as React from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";
import { useWeb3React } from "@web3-react/core";
import { JOB_ID_CCT_WALLET_EA, ORACLE_ADDRESS } from "../../../utils/const";
import { Dispatch, useCallback } from "react";
import { useRequestCheckingIsClaimable } from "../../../hooks/distributors/cct-wallet/useRequestCheckingIsClaimable";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import { AudiusState } from "../../../reducers/audius";

export interface TokenRequestCardProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
  readonly audiusState: AudiusState;
  readonly campaignAddress: string | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    container: {
      padding: theme.spacing(3),
    },
    firstBtn: {
      margin: theme.spacing(1, 0, 1),
    },
  })
);

const TokenRequestCard: React.FC<TokenRequestCardProps> = ({
  state,
  dispatch,
  audiusState,
  campaignAddress,
}) => {
  const classes = useStyles();
  const { library } = useWeb3React();
  const requestCheck = useRequestCheckingIsClaimable(
    library,
    ORACLE_ADDRESS,
    JOB_ID_CCT_WALLET_EA,
    campaignAddress ?? "",
    audiusState?.user?.wallet ?? ""
  );

  const onClickRequest = useCallback(async () => {
    const transaction = await requestCheck();
    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    dispatch({ type: "isTokenRequested:setTrue" });
    console.debug(transaction);
  }, [requestCheck, dispatch]);

  if (state.isCampaignClaimable || state.isTokenCheckFinished) {
    return null;
  }
  const text = state.isTokenRequested
    ? "Request sent. Please visit after transaction is completed."
    : "Send a check request to see whether you are eligible for to claim.";
  return (
    <div style={{ marginTop: "24px" }}>
      <Paper className={classes.container}>
        <Typography align="center">{text}</Typography>
        <Box textAlign="center" my={5}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickRequest}
            disabled={state.isTokenRequested}
          >
            Check request
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default TokenRequestCard;
