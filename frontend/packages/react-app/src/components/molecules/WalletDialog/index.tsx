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
  fortmatic,
  portis,
  torus,
} from "../../../utils/connectors";

enum ConnectorNames {
  Injected = "Metamask",
  WalletConnect = "WalletConnect",
  Fortmatic = "Fortmatic",
  Portis = "Portis",
  Torus = "Torus",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.Portis]: portis,
  [ConnectorNames.Torus]: torus,
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
              if (currentConnector === undefined) {
                return null;
              }
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
