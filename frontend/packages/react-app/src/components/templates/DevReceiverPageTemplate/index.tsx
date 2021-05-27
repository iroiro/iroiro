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
import { Box, Typography, Paper, Button, TextField } from "@material-ui/core";
import AppFrame from "../../organisms/AppFrame";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import Item from "../../molecules/Item";
import EtherscanLink from "../../atoms/EtherscanLink";
import { DevReceiver } from "../../../generated/graphql";
import { BigNumber } from "ethers";
import { Currency } from "@usedapp/core";

export interface DevReceiverPageTemplateProps {
  readonly account: string | undefined | null;
  readonly actualWithdrawableAmount: BigNumber | undefined;
  readonly chargeReward: (...args: any[]) => Promise<void>;
  readonly communityToken: Currency;
  readonly contractPTBalance: BigNumber | undefined;
  readonly contractDevBalance: BigNumber | undefined;
  readonly ctBalance: BigNumber | undefined;
  readonly ctTotalSupply: BigNumber | undefined;
  readonly devReceiver: DevReceiver | undefined | null;
  readonly devReceiverAddress: string;
  readonly devToken: Currency;
  readonly devTokenAddress: string;
  readonly maxWithdrawableAmount: BigNumber | undefined;
  readonly propertyToken: Currency;
  readonly ptBalance: BigNumber | undefined;
  readonly rescue: (...args: any[]) => Promise<void>;
  readonly transfer: (...args: any[]) => Promise<void>;
  readonly withdraw: (...args: any[]) => Promise<void>;
}

const DevReceiverPageTemplate: React.FC<DevReceiverPageTemplateProps> = ({
  account,
  actualWithdrawableAmount,
  chargeReward,
  communityToken,
  ctBalance,
  ctTotalSupply,
  contractPTBalance,
  contractDevBalance,
  devReceiver,
  devReceiverAddress,
  devTokenAddress,
  devToken,
  maxWithdrawableAmount,
  propertyToken,
  ptBalance,
  rescue,
  transfer,
  withdraw,
}) => {
  if (devReceiver === null) {
    return <p>Loading...</p>;
  }

  const pair = `${devReceiver?.propertyToken.symbol ?? ""} / ${
    devReceiver?.communityToken.symbol ?? ""
  }`;
  const ptName = `${devReceiver?.propertyToken.name}(${devReceiver?.propertyToken.name})`;
  const ctName = `${devReceiver?.communityToken.name}(${devReceiver?.communityToken.name})`;

  return (
    <>
      <AppFrame>
        <Paper variant="outlined" style={{ border: "none" }}>
          <TypeWrapper>
            <Typography variant={"h3"}>Dev Receiver Detail</Typography>
          </TypeWrapper>
          <Wrapper>
            <Box>
              <Typography variant={"h4"} color="primary">
                Tokens information
              </Typography>
              <Box
                display="flex"
                mt={2}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item title="Token pair" text={pair} />
              </Box>
              <Box
                display="flex"
                mt={2}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item title="Property Token" text={ptName} />
                <Item title="Community Token" text={ctName} />
              </Box>
              <Box
                display="flex"
                mt={2}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item
                  title="Community Token Total Supply"
                  text={communityToken.format(
                    ctTotalSupply?.toString() ?? "0",
                    { suffix: " $" + communityToken.ticker }
                  )}
                />
                <Item
                  title="Your Community Token Balance"
                  text={communityToken.format(ctBalance?.toString() ?? "0", {
                    suffix: " $" + communityToken.ticker,
                  })}
                />
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Typography variant={"h4"} color="primary">
                  Rewards
                </Typography>
              </Box>
              <Box
                display="flex"
                mt={2}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item
                  title="Max withdrawable amount"
                  text={devToken.format(
                    maxWithdrawableAmount?.toString() ?? "0",
                    {
                      suffix: " $" + devToken.ticker,
                    }
                  )}
                />
                <Item
                  title="Current withdrawable amount"
                  text={devToken.format(
                    actualWithdrawableAmount?.toString() ?? "0",
                    {
                      suffix: " $" + devToken.ticker,
                    }
                  )}
                />
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Button onClick={() => chargeReward()}>Charge reward</Button>
                <TextField label="Amount to burn" />
                <Button onClick={() => withdraw()}>Withdraw reward</Button>
              </Box>
              {account?.toLowerCase() === devReceiver?.author && (
                <>
                  <Box
                    display="flex"
                    mt={4}
                    style={{ alignItems: "center", justifyContent: "left" }}
                  >
                    <Typography variant={"h4"} color="primary">
                      Property Token Management
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    mt={2}
                    style={{ alignItems: "center", justifyContent: "left" }}
                  >
                    <Item
                      title="Your Property Token Balance"
                      text={propertyToken.format(ptBalance?.toString() ?? "0", {
                        suffix: " $" + propertyToken.ticker,
                      })}
                    />
                    <Item
                      title="Dev Receiver's Property Token Balance"
                      text={propertyToken.format(
                        contractPTBalance?.toString() ?? "0",
                        {
                          suffix: " $" + propertyToken.ticker,
                        }
                      )}
                    />
                  </Box>
                  <Box
                    display="flex"
                    mt={2}
                    style={{ alignItems: "center", justifyContent: "left" }}
                  >
                    <Item
                      title="Dev Receiver's $DEV Balance"
                      text={devToken.format(
                        contractDevBalance?.toString() ?? "0",
                        {
                          suffix: " $" + devToken.ticker,
                        }
                      )}
                    />
                  </Box>
                  <Box
                    display="flex"
                    mt={2}
                    style={{ alignItems: "center", justifyContent: "left" }}
                  >
                    <TextField label="Amount to deposit" />
                    <Button onClick={() => transfer(devReceiverAddress, 1)}>
                      Deposit Property Token
                    </Button>
                    <TextField label="Amount to withdraw" />
                    <Button
                      onClick={() => rescue(devReceiver?.propertyToken.id)}
                    >
                      Withdraw Property Token
                    </Button>
                    <Button onClick={() => rescue(devTokenAddress)}>
                      Withdraw $DEV
                    </Button>
                  </Box>
                  <Box
                    display="flex"
                    mt={2}
                    style={{ alignItems: "center", justifyContent: "left" }}
                    overflow="hidden"
                  >
                    <Item
                      title="Contract Address"
                      text={devReceiver?.id ?? ""}
                    />
                  </Box>
                  <Box
                    display="flex"
                    style={{ alignItems: "center", justifyContent: "left" }}
                  >
                    <EtherscanLink
                      type="contract"
                      addressOrTxHash={devReceiver?.id ?? ""}
                      small={true}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Wrapper>
        </Paper>
      </AppFrame>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 40px 40px;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

const TypeWrapper = styled.div`
  padding: 40px 40px 0;
  ${theme.breakpoints.down(600)} {
    padding: 16px;
  }
`;

export default DevReceiverPageTemplate;
