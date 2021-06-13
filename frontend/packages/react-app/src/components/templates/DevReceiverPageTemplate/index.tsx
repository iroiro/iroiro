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
import { Box, Typography, Paper, Button } from "@material-ui/core";
import AppFrame from "../../organisms/AppFrame";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import Item from "../../molecules/Item";
import EtherscanLink from "../../atoms/EtherscanLink";
import { DevReceiver } from "../../../generated/graphql";
import { BigNumber } from "ethers";
import { Currency, TransactionStatus } from "@usedapp/core";
import ChargeRewardModal from "../../organisms/modals/ChargeRewardModal";
import WithdrawRewardModal from "../../organisms/modals/WithdrawRewardModal";
import DepositPTModal from "../../organisms/modals/DepositPTModal";
import WithdrawPTModal from "../../organisms/modals/WithdrawPTModal";
import WithdrawDEVModal from "../../organisms/modals/WithdrawDEVModal";

export interface DevReceiverPageTemplateProps {
  readonly account: string | undefined | null;
  readonly actualMaxWithdrawableAmount: BigNumber | undefined;
  readonly approveCT: (...args: any[]) => void;
  readonly approveCTStatus: TransactionStatus;
  readonly chargeReward: (...args: any[]) => Promise<void>;
  readonly chargeRewardStatus: TransactionStatus;
  readonly chargeableReward: BigNumber | undefined;
  readonly communityToken: Currency;
  readonly contractPTBalance: BigNumber | undefined;
  readonly contractDevBalance: BigNumber | undefined;
  readonly ctAllowance: BigNumber | undefined;
  readonly ctBalance: BigNumber | undefined;
  readonly ctTotalSupply: BigNumber | undefined;
  readonly depositPT: (...args: any[]) => void;
  readonly depositPTStatus: TransactionStatus;
  readonly devReceiver: DevReceiver | undefined | null;
  readonly devReceiverAddress: string;
  readonly devToken: Currency;
  readonly devTokenAddress: string;
  readonly maxWithdrawableAmount: BigNumber | undefined;
  readonly propertyToken: Currency;
  readonly propertyTokenAddress: string;
  readonly ptBalance: BigNumber | undefined;
  readonly rescue: (...args: any[]) => Promise<void>;
  readonly transfer: (...args: any[]) => Promise<void>;
  readonly withdraw: (...args: any[]) => Promise<void>;
  readonly withdrawReward: (...args: any[]) => Promise<void>;
  readonly withdrawRewardStatus: TransactionStatus;
  readonly withdrawPT: (...args: any[]) => Promise<void>;
  readonly withdrawPTStatus: TransactionStatus;
  readonly withdrawDEV: (...args: any[]) => Promise<void>;
  readonly withdrawDEVStatus: TransactionStatus;
  readonly amountToBurn: string;
  readonly setAmountToBurn: (amount: string) => void;
  readonly amountToDeposit: string;
  readonly setAmountToDeposit: (amount: string) => void;
  readonly openChargeRewardModal: boolean;
  readonly setOpenChargeRewardModal: (open: boolean) => void;
  readonly openWithdrawRewardModal: boolean;
  readonly setOpenWithdrawRewardModal: (open: boolean) => void;
  readonly openDepositPTModal: boolean;
  readonly setOpenDepositPTModal: (open: boolean) => void;
  readonly openWithdrawPTModal: boolean;
  readonly setOpenWithdrawPTModal: (open: boolean) => void;
  readonly openWithdrawDEVModal: boolean;
  readonly setOpenWithdrawDEVModal: (open: boolean) => void;
}

const DevReceiverPageTemplate: React.FC<DevReceiverPageTemplateProps> = ({
  account,
  actualMaxWithdrawableAmount,
  amountToBurn,
  setAmountToBurn,
  amountToDeposit,
  setAmountToDeposit,
  approveCT,
  approveCTStatus,
  chargeReward,
  chargeRewardStatus,
  chargeableReward,
  communityToken,
  ctAllowance,
  ctBalance,
  ctTotalSupply,
  contractPTBalance,
  contractDevBalance,
  depositPT,
  depositPTStatus,
  devReceiver,
  devReceiverAddress,
  devToken,
  maxWithdrawableAmount,
  propertyToken,
  propertyTokenAddress,
  ptBalance,
  withdrawReward,
  withdrawRewardStatus,
  withdrawPT,
  withdrawPTStatus,
  withdrawDEV,
  withdrawDEVStatus,
  openChargeRewardModal,
  setOpenChargeRewardModal,
  openWithdrawRewardModal,
  setOpenWithdrawRewardModal,
  openDepositPTModal,
  setOpenDepositPTModal,
  openWithdrawPTModal,
  setOpenWithdrawPTModal,
  openWithdrawDEVModal,
  setOpenWithdrawDEVModal,
}) => {
  if (devReceiver === undefined || devReceiver === null) {
    return (
      <AppFrame>
        <Paper variant="outlined" style={{ border: "none" }}>
          <TypeWrapper>
            <Typography variant={"h3"}>DEV Receiver Detail</Typography>
          </TypeWrapper>
          <Wrapper>
            <Box>
              <p>Loading...</p>
            </Box>
          </Wrapper>
        </Paper>
      </AppFrame>
    );
  }

  const pair = `${devReceiver?.propertyToken.symbol ?? ""} / ${
    devReceiver?.communityToken.symbol ?? ""
  }`;
  const ptName = `${devReceiver?.propertyToken.name}(${devReceiver?.propertyToken.symbol})`;
  const ctName = `${devReceiver?.communityToken.name}(${devReceiver?.communityToken.symbol})`;

  return (
    <AppFrame>
      <ChargeRewardModal
        chargeableReward={chargeableReward}
        open={openChargeRewardModal}
        onCloseModal={() => {
          setOpenChargeRewardModal(false);
        }}
        chargeReward={chargeReward}
        chargeRewardStatus={chargeRewardStatus}
      />
      <WithdrawRewardModal
        amountToBurn={amountToBurn}
        setAmountToBurn={setAmountToBurn}
        communityToken={communityToken}
        ctAllowance={ctAllowance}
        ctBalance={ctBalance}
        devReceiverAddress={devReceiverAddress}
        open={openWithdrawRewardModal}
        onCloseModal={() => setOpenWithdrawRewardModal(false)}
        approve={approveCT}
        approveStatus={approveCTStatus}
        withdrawReward={withdrawReward}
        withdrawRewardStatus={withdrawRewardStatus}
      />
      <DepositPTModal
        amountToDeposit={amountToDeposit}
        setAmountToDeposit={setAmountToDeposit}
        devReceiverAddress={devReceiverAddress}
        propertyToken={propertyToken}
        ptBalance={ptBalance}
        open={openDepositPTModal}
        onCloseModal={() => setOpenDepositPTModal(false)}
        depositPT={depositPT}
        depositPTStatus={depositPTStatus}
      />
      <WithdrawPTModal
        contractBalance={contractPTBalance}
        token={propertyToken}
        propertyTokenAddress={propertyTokenAddress}
        open={openWithdrawPTModal}
        onCloseModal={() => setOpenWithdrawPTModal(false)}
        withdraw={withdrawPT}
        withdrawStatus={withdrawPTStatus}
      />
      <WithdrawDEVModal
        contractBalance={contractDevBalance}
        open={openWithdrawDEVModal}
        onCloseModal={() => setOpenWithdrawDEVModal(false)}
        withdraw={withdrawDEV}
        withdrawStatus={withdrawDEVStatus}
      />
      <Paper variant="outlined" style={{ border: "none" }}>
        <TypeWrapper>
          <Typography variant={"h3"}>DEV Receiver Detail</Typography>
        </TypeWrapper>
        <Wrapper>
          <Box>
            <Typography variant={"h3"} color="primary">
              Tokens information
            </Typography>
            <Box
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
            >
              <Item title="Token pair" text={pair} />
            </Box>
            <Box
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
            >
              <Item title="Property Token" text={ptName} />
            </Box>
            <Box
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
            >
              <Item title="Community Token" text={ctName} />
            </Box>
            <Box
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
            >
              <Item
                title="Community Token Total Supply"
                text={communityToken.format(ctTotalSupply?.toString() ?? "0", {
                  suffix: " $" + communityToken.ticker,
                })}
              />
            </Box>
            <Box
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
            >
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
              <Typography variant={"h3"} color="primary">
                Rewards
              </Typography>
            </Box>
            <Box
              display="flex"
              mt={1}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
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
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setOpenChargeRewardModal(true)}
                disabled={chargeableReward?.isZero() ?? true}
              >
                Charge reward
              </Button>
            </Box>
            <Box
              display="flex"
              mt={2}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Item
                title="Current withdrawable amount"
                text={devToken.format(
                  actualMaxWithdrawableAmount?.toString() ?? "0",
                  {
                    suffix: " $" + devToken.ticker,
                  }
                )}
              />
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setOpenWithdrawRewardModal(true)}
                disabled={
                  actualMaxWithdrawableAmount === undefined ||
                  actualMaxWithdrawableAmount.isZero()
                }
              >
                Withdraw reward
              </Button>
            </Box>
            {account?.toLowerCase() === devReceiver?.author && (
              <>
                <Box
                  display="flex"
                  mt={4}
                  style={{ alignItems: "center", justifyContent: "left" }}
                >
                  <Typography variant={"h3"} color="primary">
                    Property Token Management
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  mt={1}
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Item
                    title="Your Property Token Balance"
                    text={propertyToken.format(ptBalance?.toString() ?? "0", {
                      suffix: " $" + propertyToken.ticker,
                    })}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setOpenDepositPTModal(true)}
                    disabled={ptBalance === undefined || ptBalance.isZero()}
                  >
                    Deposit Property Token
                  </Button>
                </Box>
                <Box
                  display="flex"
                  mt={2}
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Item
                    title="DEV Receiver's Property Token Balance"
                    text={propertyToken.format(
                      contractPTBalance?.toString() ?? "0",
                      {
                        suffix: " $" + propertyToken.ticker,
                      }
                    )}
                  />
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => setOpenWithdrawPTModal(true)}
                    disabled={
                      contractPTBalance === undefined ||
                      contractPTBalance.isZero()
                    }
                  >
                    Withdraw Property Token
                  </Button>
                </Box>
                <Box
                  display="flex"
                  mt={2}
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Item
                    title="DEV Receiver's $DEV Balance"
                    text={devToken.format(
                      contractDevBalance?.toString() ?? "0",
                      {
                        suffix: " $" + devToken.ticker,
                      }
                    )}
                  />
                  <Button
                    disabled={contractDevBalance?.isZero() ?? true}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => setOpenWithdrawDEVModal(true)}
                  >
                    Withdraw $DEV
                  </Button>
                </Box>
              </>
            )}
            <Box
              display="flex"
              mt={1}
              style={{ alignItems: "center", justifyContent: "left" }}
              overflow="hidden"
            >
              <Item title="Contract Address" text={devReceiver?.id ?? ""} />
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
          </Box>
        </Wrapper>
      </Paper>
    </AppFrame>
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
