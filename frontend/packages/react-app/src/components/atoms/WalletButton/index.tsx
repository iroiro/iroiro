import { Box, Button, Modal, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../../utils/connectors";
import WalletDialog from "../../molecules/WalletDialog";

function ellipseAddress(address = "", width = 5): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

const WalletButton: React.FC = () => {
  const { account, deactivate, active, error, activate } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" style={{ alignItems: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClickOpen();
          }}
        >
          {active && account ? ellipseAddress(account) : "Wallet Connect"}
        </Button>
      </Box>
      {isUnsupportedChainIdError && (
        <Modal
          open
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper>
            <Box p={5}>
              <Typography variant={"h3"}>
                Switch to a supported Ethereum network
              </Typography>
              <Box mt={2}>
                <Typography>
                  To access Ioriro, please switch to the Rinkeby test network.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Modal>
      )}
      <WalletDialog selectedValue={""} open={open} onClose={handleClose} />
    </>
  );
};

export default WalletButton;
