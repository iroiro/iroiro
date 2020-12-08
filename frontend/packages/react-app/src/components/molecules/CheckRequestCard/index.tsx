import * as React from "react";
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useApproveToken } from "../../../hooks/useApproveToken";
import { TokenInformationState } from "../../../interfaces";
import { useWeb3React } from "@web3-react/core";
import { LINK_APPROVE_AMOUNT, LINK_TOKEN_ADDRESS } from "../../../utils/const";
import { useCallback } from "react";

export interface TokenRequestCardProps {
  state: TokenInformationState;
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
    btnWrapper: {
      textAlign: "center",
    },
    firstBtn: {
      margin: theme.spacing(1, 0, 1),
    },
  })
);

const TokenRequestCard: React.FC<TokenRequestCardProps> = ({ state }) => {
  const classes = useStyles();
  const { library } = useWeb3React();
  const approve = useApproveToken(
    library,
    LINK_TOKEN_ADDRESS,
    state?.campaignAddress ?? "",
    LINK_APPROVE_AMOUNT
  );

  const onClickApprove = useCallback(async () => {
    const transaction = await approve();
    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    console.debug(transaction);
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.container}>
          <Typography align="center">
            Send a check request to see whether you are eligible for to claim.
          </Typography>
          <div className={` ${classes.btnWrapper} ${classes.firstBtn}`}>
            <Button
              variant="contained"
              color="primary"
              disabled={state.isTokenApproved}
              onClick={onClickApprove}
            >
              Approve $LINK
            </Button>
          </div>
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              color="primary"
              disabled={!state.isTokenApproved || state.isTokenRequested}
            >
              Check request
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TokenRequestCard;
