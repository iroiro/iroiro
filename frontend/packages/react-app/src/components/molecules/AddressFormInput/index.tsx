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
import { FormControl, InputLabel, Input, Box } from "@material-ui/core";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";

const AddressFormInput: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
  <Box width={1}>
    <FormControl fullWidth>
      <InputLabel htmlFor="contract-address">Contract Address</InputLabel>
      <Input
        id="contract-address"
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "tokenAddress:input",
            payload: { tokenAddress: event.target.value },
          })
        }
        value={state.inputTokenAddress}
        fullWidth
      />
    </FormControl>
  </Box>
);

export default AddressFormInput;
