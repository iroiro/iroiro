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
import { useApproveToken } from "../../../hooks/useApproveToken";
import { TokenInformationState } from "../../../interfaces";
import { useWeb3React } from "@web3-react/core";
import {
  JOB_ID_CCT_WALLET_EA,
  LINK_APPROVE_AMOUNT,
  LINK_TOKEN_ADDRESS,
  ORACLE_ADDRESS,
} from "../../../utils/const";
import { Dispatch, useCallback } from "react";
import { useRequestCheckingIsClaimable } from "../../../hooks/distributors/audius-followers/useRequestCheckingIsClaimable";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";

export interface TokenRequestCardProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
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
  audiusDispatch,
}) => {
  const classes = useStyles();
  const { library } = useWeb3React();
  const approve = useApproveToken(
    library,
    LINK_TOKEN_ADDRESS,
    state?.campaignAddress ?? "",
    LINK_APPROVE_AMOUNT
  );
  const requestCheck = useRequestCheckingIsClaimable(
    library,
    ORACLE_ADDRESS,
    JOB_ID_CCT_WALLET_EA,
    state?.campaignAddress ?? "",
    audiusState.user.wallet ?? ""
  );

  const onClickRequest = useCallback(async () => {
    const transaction = await requestCheck();
    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [approve, requestCheck]);

  return (
    <div style={{ marginTop: "24px" }}>
      <Paper className={classes.container}>
        <Typography align="center">
          Send a check request to see whether you are eligible for to claim.
        </Typography>
        <Box textAlign="center" my={5}>
          <Button variant="contained" color="primary" onClick={onClickRequest}>
            Check request
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default TokenRequestCard;
