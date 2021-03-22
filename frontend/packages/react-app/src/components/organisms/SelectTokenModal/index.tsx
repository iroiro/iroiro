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
import { Box, Card, Button, Modal } from "@material-ui/core";
import SelectTokenInput, { TokenOption } from "../../atoms/SelectTokenInput";
import { useTokenContext } from "../../../context/token";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_TOKEN_LIST } from "../../../graphql/subgraph";
import { getTokenInfo } from "../../../utils/web3";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface SelectTokenModalProps {
  open: boolean;
  onCloseModal: () => void;
}

const SelectTokenModal: React.FC<SelectTokenModalProps> = ({
  open,
  onCloseModal,
}) => {
  const { library } = useWeb3React();
  const history = useHistory();
  const [value, setValue] = useState<TokenOption>({
    tokenName: "",
    tokenAddress: "",
  });
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();
  const [getTokenList, { data: tokenData }] = useLazyQuery(GET_TOKEN_LIST);
  const [tokenList, setTokenList] = useState([]);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    if (tokenState.tokens.length === 0) {
      getTokenList();
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    if (tokenData === undefined) {
      return;
    }

    const tokens = tokenData.campaigns.map((data: any) => {
      return data.token;
    });

    setTokenList(Array.from(new Set(tokens)));
  }, [tokenData, open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    if (tokenList.length === 0) {
      return;
    }
    if (tokenState.tokens.length !== 0) {
      return;
    }

    const f = async () => {
      const tokenNames = tokenList.map(async (token) => {
        const tokenInfo = await getTokenInfo(library, token);
        return {
          tokenName: tokenInfo?.name,
          tokenAddress: token,
        } as TokenOption;
      });
      return Promise.all(tokenNames);
    };

    f().then((r) => {
      tokenStateDispatch({
        type: "tokens:set",
        payload: {
          tokens: r,
        },
      });
    });
  }, [tokenList, open]);

  useEffect(() => {
    if (value === null || value.tokenAddress === "") {
      return;
    }

    history.push(`/explore/token/${value.tokenAddress}`);
    onCloseModal();
    setValue({
      tokenName: "",
      tokenAddress: "",
    });
  }, [value]);

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={open}
      onClose={() => onCloseModal()}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledCard>
        <Box p={4} mb={3}>
          <Box mt={2}>
            <SelectTokenInput
              label={
                tokenState.tokens.length === 0
                  ? "Please Wait...⏳"
                  : "Choose Token"
              }
              options={tokenState.tokens}
              value={value}
              onChange={(value: TokenOption) => setValue(value)}
              disabled={tokenState.tokens.length === 0}
            />
          </Box>
        </Box>
      </StyledCard>
    </Modal>
  );
};

const StyledCard = styled(Card)`
  ${theme.breakpoints.down(600)} {
    width: 80%;
  }
`;

export default SelectTokenModal;
