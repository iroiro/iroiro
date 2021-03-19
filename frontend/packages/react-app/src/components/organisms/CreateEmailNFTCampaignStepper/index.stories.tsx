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
import { BrowserRouter } from "react-router-dom";
import CreateEmailNFTCampaignStepper, {
  CreateEmailNFTCampaignStepperProps,
} from ".";
import {
  distributorFormState,
  emailState,
  tokenInfo,
} from "../../../utils/mockData";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Organisms/CreateEmailNFTCampaignStepper",
  component: CreateEmailNFTCampaignStepper,
} as Meta;

const Template: Story<CreateEmailNFTCampaignStepperProps> = (args) => (
  <BrowserRouter>
    <CreateEmailNFTCampaignStepper {...args} />
  </BrowserRouter>
);

export const Step1 = Template.bind({});
Step1.args = {
  emailState: {
    ...emailState,
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState: {
    ...distributorFormState,
    distributorType: "email-nft",
    step: 0,
  },
};

export const Step2 = Template.bind({});
Step2.args = {
  ...Step1.args,
  distributorFormState: {
    ...distributorFormState,
    ...Step1.args.distributorFormState,
    step: 1,
  },
};

export const Step3 = Template.bind({});
Step3.args = {
  ...Step1.args,
  emailState: {
    ...emailState,
    rawTargets: [...Array(3)].map(() => uuidv4()),
    emailList: ["test1@example.com", "test2@example.com", "test3@example.com"],
  },
  distributorFormState: {
    ...distributorFormState,
    ...Step1.args.distributorFormState,
    step: 2,
  },
};
