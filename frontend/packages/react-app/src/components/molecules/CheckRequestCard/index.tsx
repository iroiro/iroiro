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

export interface TokenRequestCardProps {
  isApproved: boolean;
  isRequested: boolean;
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

const TokenRequestCard = ({
  isApproved,
  isRequested,
}: TokenRequestCardProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.container}>
          <Typography align="center">
            Send a check request to see whether you are eligible for to claim.
          </Typography>
          <div className={` ${classes.btnWrapper} ${classes.firstBtn}`}>
            <Button variant="contained" color="primary" disabled={isApproved}>
              Approve $LINK
            </Button>
          </div>
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              color="primary"
              disabled={!isApproved || isRequested}
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
