import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Box,
  Divider,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect } from "../../../hooks/web3react/useEagerConnect";
import { useInactiveListener } from "../../../hooks/web3react/useInactiveListener";

import {
  injected,
  walletconnect,
  authereum,
  fortmatic,
  portis,
} from "../../../utils/connectors";

enum ConnectorNames {
  Injected = "Metamask",
  WalletConnect = "WalletConnect",
  Authereum = "Authereum",
  Fortmatic = "Fortmatic",
  Portis = "Portis",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Authereum]: authereum,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.Portis]: portis,
};

export interface WalletDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  open,
  selectedValue,
  onClose,
}) => {
  const context = useWeb3React<Web3Provider>();
  const { connector, activate, deactivate, error } = context;

  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Box p={4}>
          <DialogTitle id="simple-dialog-title">Connect Wallet</DialogTitle>
          <List>
            {Object.keys(connectorsByName).map((name) => {
              // @ts-ignore
              const currentConnector = connectorsByName[name];
              const activating = currentConnector === activatingConnector;
              const connected = currentConnector === connector;
              const disabled =
                !triedEager || !!activatingConnector || connected || !!error;

              return (
                <div key={name}>
                  {!connected ? (
                    <Box mb={1}>
                      <ListItem
                        disabled={disabled}
                        key={name}
                        onClick={() => {
                          setActivatingConnector(currentConnector);
                          // @ts-ignore
                          activate(connectorsByName[name]);
                          onClose("");
                        }}
                        style={{
                          border: "1px solid",
                          borderColor: "lightgray",
                          borderRadius: "5px",
                        }}
                      >
                        {activating && (
                          <ListItemIcon
                            style={{
                              minWidth: 0,
                              marginRight: 5,
                            }}
                          >
                            <CircularProgress size={20} />
                          </ListItemIcon>
                        )}
                        {name}
                      </ListItem>
                    </Box>
                  ) : (
                    <Box mb={1}>
                      <ListItem
                        disabled={disabled}
                        key={name}
                        onClick={() => {
                          setActivatingConnector(currentConnector);
                          // @ts-ignore
                          activate(connectorsByName[name]);
                          onClose("");
                        }}
                      >
                        <ListItemIcon style={{ minWidth: 0, marginRight: 5 }}>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        {name}
                      </ListItem>
                    </Box>
                  )}
                </div>
              );
            })}
          </List>
          {connector !== undefined &&
            connector !== connectorsByName[ConnectorNames.Injected] && (
              <>
                <Divider style={{ margin: "20px 0px" }} />
                <Box textAlign="center">
                  <Box mb={1}>
                    <Button
                      variant="outlined"
                      color="default"
                      onClick={() => {
                        deactivate();
                      }}
                    >
                      Disconnect
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        (connector as any).close();
                      }}
                    >
                      Kill Wallet Session
                    </Button>
                  </Box>
                </Box>
              </>
            )}
        </Box>
      </Dialog>
    </>
  );
};

export default WalletDialog;
