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
  Card,
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
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const StyledSelect = styled(Select)`
  width: 30%;
`;

const UploadEmailCsvPane: React.FC<TargetsProps> = ({
  distributorFormDispatch,
  emailState,
  emailDispatch,
}) => {
  const parserOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  return (
    <>
      <Card>
        <Box p={4}>
          <Box mt={4}>
            <Typography variant={"h4"}>
              1. Upload your fans email list
            </Typography>
          </Box>
          {emailState.isCsvUploaded &&
          emailState.isValidEmails &&
          emailState.emailList.length > 0 ? (
            <>
              <Box my={4} style={{ textAlign: "center" }}>
                <Typography>Total Email Addresses</Typography>
                <Typography variant="h2">
                  {emailState.emailList.length}
                </Typography>
              </Box>
              <Box my={5} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    emailDispatch({ type: "targets:generate" });
                    distributorFormDispatch({
                      type: "step:set",
                      payload: { stepNo: 2 },
                    });
                  }}
                  disabled={
                    !emailState.isValidEmails ||
                    emailState.emailList.length === 0
                  }
                >
                  Next
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box my={2}>
                <Typography variant={"body1"}>File type: CSV</Typography>
                <Typography variant={"body1"}>
                  CSV must contain email column.
                </Typography>
              </Box>
              <Button variant="contained" component="label">
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
                    Column values are not valid email.
                  </Typography>
                </Box>
              )}
              {emailState.isCsvUploaded && emailState.emailList.length === 0 && (
                <Box mt={1}>
                  <Typography color={"error"}>CSV is empty</Typography>
                </Box>
              )}
            </>
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
                <InputLabel id="demo-simple-select-helper-label">
                  Column position
                </InputLabel>
                <StyledSelect
                  value={emailState.selectedColumn}
                  onChange={(e) => {
                    emailDispatch({
                      type: "selectedColumn:set",
                      payload: {
                        selectedColumn: Number.parseInt(
                          e.target.value as string
                        ),
                      },
                    });
                  }}
                >
                  {[...Array(emailState.csvColumnQuantity)].map(
                    (value, index) => {
                      return (
                        <MenuItem key={index} value={index}>
                          {index + 1}
                        </MenuItem>
                      );
                    }
                  )}
                </StyledSelect>
                <FormHelperText>
                  Select column position which contains email values
                </FormHelperText>
              </FormControl>
            </FormGroup>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UploadEmailCsvPane;
