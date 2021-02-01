import * as React from "react";
import { Box, Typography, Card, Button, TextField } from "@material-ui/core";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { WalletList } from "../../../interfaces";
import { WALLET_ACTIONS } from "../../../reducers/wallet";

export interface TargetsProps {
  readonly walletListState: WalletList;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly walletDispatch: React.Dispatch<WALLET_ACTIONS>;
}

// TODO add input form
const UUIDDistributionTargets: React.FC<TargetsProps> = ({
  walletListState,
  distributorFormDispatch,
  walletDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>
            1. Input distribution target quantity
          </Typography>
        </Box>
        <>
          <Box my={4} style={{ textAlign: "center" }}>
            <Typography>Distribution target quantity</Typography>
          </Box>
          <Box my={2} style={{ textAlign: "center" }}>
            <TextField
              placeholder="100"
              type="number"
              inputProps={{ min: 1 }}
            />
          </Box>
          <Box my={5} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={!(walletListState.targets.length > 0)}
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Next
            </Button>
          </Box>
        </>
      </Box>
    </Card>
  </>
);

export default UUIDDistributionTargets;
