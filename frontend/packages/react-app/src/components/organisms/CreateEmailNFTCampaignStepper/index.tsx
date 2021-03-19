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
import { useMemo, useState } from "react";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import { upperLimit } from "../WalletDistributionTargets";
import { AccountToken } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import theme from "../../../theme/mui-theme";
import { EmailState, EMAIL_ACTIONS } from "../../../reducers/email";
import UploadEmailCsvPane from "../UploadEmailCsvPane";
import { CSVLink } from "react-csv";
import { ACTIONS } from "../../../reducers/token";
import StartCampaignStep from "../../molecules/steps/StartCampaignStep";
import {
  StartCampaignButton,
  StyledStepperButton,
  StyleStepper,
} from "../../../theme/commonStyles";

export interface CreateEmailNFTCampaignStepperProps {
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly emailState: EmailState;
  readonly emailDispatch: React.Dispatch<EMAIL_ACTIONS>;
}

const CreateEmailNFTCampaignStepper = ({
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
  emailState,
  emailDispatch,
}: CreateEmailNFTCampaignStepperProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const urlList = useMemo(() => {
    const list = emailState.rawTargets.map(
      (uuid) =>
        `${window.location.origin}${window.location.pathname}#/explore/${tokenInfo.token?.tokenAddress}/distributors/${emailState.distributorAddress}/campaigns/${distributorFormState.createdCampaignId}?uuid=${uuid}`
    );
    return list;
  }, [
    emailState,
    distributorFormState.createdCampaignId,
    tokenInfo.token?.tokenAddress,
  ]);

  const emailUrlPair = useMemo(() => {
    return emailState.emailList.map((email, index) => {
      return [email, urlList[index]];
    });
  }, [emailState.emailList, urlList]);
  const csvData = [["Email", "Campaign URL"], ...emailUrlPair];

  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  return (
    <div>
      <StyleStepper
        activeStep={distributorFormState.step}
        orientation="vertical"
      >
        <Step>
          <StepLabel>Upload your fans email list</StepLabel>
          <StepContent>
            <div style={{ marginBottom: 16 }}>
              <UploadEmailCsvPane
                emailState={emailState}
                emailDispatch={emailDispatch}
              />
            </div>
            <Box mt={5}>
              <StyledStepperButton onClick={() => handleStepChange(0)}>
                Back
              </StyledStepperButton>
              <StyledStepperButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={
                  !emailState.isValidEmails ||
                  emailState.emailList.length === 0 ||
                  upperLimit < emailState.emailList.length
                }
                onClick={() => {
                  emailDispatch({ type: "targets:generate" });
                  handleStepChange(2);
                }}
              >
                Next
              </StyledStepperButton>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Setup basic info</StepLabel>
          <StepContent>
            <StartCampaignStep
              currentStep={distributorFormState.step}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Download CSV</StepLabel>
          <StepContent>
            <div>
              <Box mt={2} mb={4}>
                <Typography variant={"body1"} style={{ lineHeight: "1.2" }}>
                  A campaign is created successfully and
                  <span
                    style={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                      display: "inline-block",
                      padding: "0 4px",
                    }}
                  >
                    {emailState.rawTargets.length}
                  </span>
                  Email addresses that you have uploaded.
                </Typography>
                <Typography style={{ lineHeight: "1.2" }}>
                  Download CSV contains email and campaign URL pair for each
                  address and send an email for them!
                </Typography>
                <Typography style={{ lineHeight: "1.2" }}>
                  You can send an email using a batch email sending service such
                  as{" "}
                  <a
                    href="https://www.mergemail.co/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MergeMail
                  </a>
                  ,{" "}
                  <a
                    href="https://www.gmass.co/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GMass
                  </a>
                  , or{" "}
                  <a href="https://yamm.com/" target="_blank" rel="noreferrer">
                    YAMM
                  </a>
                  .
                </Typography>
                <Typography style={{ lineHeight: "1.2" }}>
                  Please note, this file will be deleted after you move from
                  this page, so please be careful.
                </Typography>
              </Box>
            </div>
            <Box mt={5}>
              <StyledCSVLink
                data={csvData}
                onClick={() => setIsDownloaded(true)}
                filename="email-distribution-targets.csv"
              >
                <StyledStepperButton
                  color="secondary"
                  variant="contained"
                  disableElevation
                >
                  Download CSV file
                </StyledStepperButton>
              </StyledCSVLink>
              <StartCampaignButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={!isDownloaded}
                onClick={() => {
                  emailDispatch({ type: "moveToCampaignPage:on" });
                }}
              >
                Go to Campaign Detail
              </StartCampaignButton>
            </Box>
          </StepContent>
        </Step>
      </StyleStepper>
    </div>
  );
};

const StyledCSVLink = styled(CSVLink)`
  text-decoration: none;
`;

export default CreateEmailNFTCampaignStepper;
