import React from "react";
import { Box, Typography, Card, Button } from "@material-ui/core";
// import DistributionTargetList from "../../molecules/DistributionTargetList";
// import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { WalletListState } from "../../../interfaces";

export interface TargetsProps {
  readonly walletListState: WalletListState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const WalletDistributionTargets: React.FC<TargetsProps> = ({
  walletListState,
  distributorFormDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>
            1. Upload your wallet address list
          </Typography>
        </Box>
        {walletListState.targets.length > 0 ? (
          <>
            <Box my={4} style={{ textAlign: "center" }}>
              <Typography>Total Wallet Addresses</Typography>
              <Typography variant="h2">
                {walletListState.targets.length}
              </Typography>
            </Box>
            <Box my={5} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
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
        ) : (
          <>
            <Box my={2}>
              <Typography variant={"body1"}>File type: JSON</Typography>
              <Box display="flex">
                <Typography variant={"body1"}>Format: </Typography>
                <Box ml={2}>
                  <Typography variant={"body1"} color={"secondary"}>
                    {`{"targets": ["walletaddress1", "walletaddress2"], "type": "address"}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" accept="application/json" hidden />
            </Button>
          </>
        )}
      </Box>
    </Card>
  </>
);

export default WalletDistributionTargets;
