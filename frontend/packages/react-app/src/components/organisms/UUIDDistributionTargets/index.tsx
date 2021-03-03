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
import { Box, Typography, TextField } from "@material-ui/core";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface TargetsProps {
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const upperLimit = Number.parseInt(
  process.env?.REACT_APP_TARGETS_UPPER_LIMIT ?? "0"
);

// TODO add input form
const UUIDDistributionTargets: React.FC<TargetsProps> = ({
  uuidState,
  uuidDispatch,
}) => (
  <>
    <Box mt={2}>
      <Box>
        <Typography>Number of unique URLs (up to {upperLimit})</Typography>
      </Box>
      <Box my={2}>
        <StyledTextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            uuidDispatch({
              type: "quantity:set",
              payload: { quantity: event.target.value },
            })
          }
          placeholder="100"
          type="number"
          color="secondary"
          style={{ minWidth: 140 }}
          error={upperLimit < uuidState.quantity}
          helperText={
            upperLimit < uuidState.quantity
              ? "Input number exceeds upper limit."
              : undefined
          }
          inputProps={{
            min: 1,
            max: upperLimit,
          }}
          value={uuidState.quantity}
        />
      </Box>
    </Box>
  </>
);

const StyledTextField = styled(TextField)`
  width: 200px;
  min-width: 140px;
  margin-right: 8px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export default UUIDDistributionTargets;
