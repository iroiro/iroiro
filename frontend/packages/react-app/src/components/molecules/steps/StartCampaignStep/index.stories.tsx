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
import { Story, Meta } from "@storybook/react/types-6-0";
import { distributorFormState, tokenInfo } from "../../../../utils/mockData";
import { Step, StepContent, StepLabel, Stepper } from "@material-ui/core";
import StartCampaignStep, { StartCampaignStepProps } from "./index";

export default {
  title: "Molecules/steps/StartCampaignStep",
  component: StartCampaignStep,
} as Meta;

const Template: Story<StartCampaignStepProps> = (args) => (
  <Stepper activeStep={0} orientation="vertical">
    <Step>
      <StepLabel>Setup basic info</StepLabel>
      <StepContent>
        <StartCampaignStep {...args} />
      </StepContent>
    </Step>
  </Stepper>
);

export const Default = Template.bind({});
Default.args = {
  distributorFormState: {
    ...distributorFormState,
    step: 0,
  },
};
