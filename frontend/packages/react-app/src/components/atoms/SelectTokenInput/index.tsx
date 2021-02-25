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

import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

export type TokenOption = {
  tokenName: string;
  tokenAddress: string;
};

export type SelectTokenInputprops = {
  label: string;
  color?: "creator" | "user";
  value: TokenOption;
  options: TokenOption[];
  small: boolean;
  disabled?: boolean;
  onChange: (value: TokenOption) => void;
};

const SelectTokenInput = ({
  color = "user",
  small = false,
  disabled = false,
  ...props
}) => {
  const handleChange = (event: any, newValue: TokenOption) => {
    props.onChange(newValue);
  };

  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <Autocomplete
        value={props.value}
        options={props.options}
        getOptionLabel={(option) => option.tokenName}
        style={{ width: 300 }}
        size={small ? "small" : undefined}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
            color={color === "creator" ? "secondary" : "primary"}
          />
        )}
        onChange={handleChange}
        disabled={disabled}
      />
      <Icon>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.5"
            cy="8.5"
            r="8.5"
            fill={color === "creator" ? "#70C2D2" : "#D06689"}
          />
          <path
            d="M4.88026 7.25H12.1168C12.6174 7.25 12.8678 7.83789 12.5134 8.18242L8.89651 11.7016C8.67714 11.9148 8.31995 11.9148 8.10057 11.7016L4.4837 8.18242C4.12932 7.83789 4.37964 7.25 4.88026 7.25Z"
            fill="white"
          />
        </svg>
      </Icon>
    </div>
  );
};

const Icon = styled.span`
  position: absolute;
  top: 51%;
  transform: translateY(-50%);
  right: 13px;
  pointer-events: none;
`;

export default SelectTokenInput;
