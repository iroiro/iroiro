import * as React from "react";
import { Text, Box } from "rimble-ui";
import WalletButton from "../../atoms/WalletButton";

const WalletConnect: React.FC = () => (
  <>
    <Box m={5} style={{ textAlign: "center" }}>
      <Text>Please connect your ethereum wallet</Text>
      <Box m={4} style={{ display: "flex", justifyContent: "center" }}>
        <WalletButton />
      </Box>
    </Box>
  </>
);

export default WalletConnect;
