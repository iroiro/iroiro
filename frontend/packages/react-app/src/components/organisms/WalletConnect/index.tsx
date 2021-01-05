import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import WalletButton from "../../atoms/WalletButton";

const WalletConnect: React.FC = () => (
  <>
    <Box m={5} style={{ textAlign: "center" }}>
      <Typography>Please connect your ethereum wallet</Typography>
      <Box m={4} style={{ display: "flex", justifyContent: "center" }}>
        <WalletButton />
      </Box>
    </Box>
  </>
);

export default WalletConnect;
