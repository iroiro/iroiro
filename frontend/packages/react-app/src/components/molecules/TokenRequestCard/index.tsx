/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
}) => {
  const classes = useStyles();
  const { library } = useWeb3React();
  const requestCheck = useRequestCheckingIsClaimable(
    library,
    ORACLE_ADDRESS,
    JOB_ID_CCT_WALLET_EA,
    state?.campaignAddress ?? "",
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
