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

import React, { ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { EMAIL_ACTIONS, EmailState } from "../../../reducers/email";
import CSVReader from "react-csv-reader";
import styled from "styled-components";

export interface TargetsProps {
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const upperLimit = Number.parseInt(
  process.env?.REACT_APP_TARGETS_UPPER_LIMIT ?? "0"
);

const StyledSelect = styled(Select)`
  width: 50%;
`;

const UploadEmailCsvPane: React.FC<TargetsProps> = ({
  emailState,
  emailDispatch,
}) => {
  const parserOptions = {
    skipEmptyLines: true,
  };

  return (
    <>
      <Box>
        {emailState.isCsvUploaded &&
        emailState.isValidEmails &&
        emailState.emailList.length > 0 ? (
          <>
            <Box mt={4} mb={2}>
              <Typography>Total Email Addresses</Typography>
              <Typography variant="h2">
                {emailState.emailList.length}
              </Typography>
            </Box>
            <Box my={2}>
              {upperLimit < emailState.emailList.length && (
                <Box mt={1}>
                  <Typography color={"error"}>
                    Address number exceeds upper limit.
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box my={2}>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant={"caption"} style={{ paddingRight: 8 }}>
                File type:
              </Typography>
              <Typography variant={"body1"}>CSV</Typography>
            </Box>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant={"caption"} style={{ paddingRight: 8 }}>
                Email number limit:
              </Typography>
              <Typography variant={"body1"}>{upperLimit}</Typography>
            </Box>
            <Button variant="outlined" component="label" color="secondary">
              Upload File
              <CSVReader
                parserOptions={parserOptions}
                onFileLoaded={(rawCsv) =>
                  emailDispatch({ type: "rawCsv:set", payload: { rawCsv } })
                }
                inputStyle={{ display: "none" }}
              />
            </Button>
            {emailState.isCsvUploaded && !emailState.isValidEmails && (
              <Box mt={1}>
                <Typography color={"error"}>
                  Column values are not valid email. Maybe you should exclude
                  header on below CSV configs or change column position?
                </Typography>
              </Box>
            )}
            {emailState.isCsvUploaded && emailState.emailList.length === 0 && (
              <Box mt={1}>
                <Typography color={"error"}>CSV is empty</Typography>
              </Box>
            )}
          </Box>
        )}
        <Box mt={4}>
          <Typography>CSV configs</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={emailState.hasCsvHeader}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    emailDispatch({
                      type: "hasCsvHeader:set",
                      payload: {
                        hasCsvHeader: e.target.checked,
                      },
                    });
                  }}
                />
              }
              label="Does CSV contain a header?"
            />
            <FormControl>
              <InputLabel
                id="demo-simple-select-helper-label"
                color="secondary"
              >
                Select email column or position
              </InputLabel>
              <StyledSelect
                color="secondary"
                value={
                  emailState.columns.length === 0
                    ? ""
                    : emailState.selectedColumn
                }
                onChange={(e) => {
                  emailDispatch({
                    type: "selectedColumn:set",
                    payload: {
                      selectedColumn: Number.parseInt(e.target.value as string),
                    },
                  });
                }}
              >
                {emailState.columns.map((value, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {value}
                    </MenuItem>
                  );
                })}
              </StyledSelect>
              <FormHelperText>
                If non header value is shown after uploading, you have to
                uncheck header checkbox.
              </FormHelperText>
            </FormControl>
          </FormGroup>
        </Box>
      </Box>
    </>
  );
};

export default UploadEmailCsvPane;
