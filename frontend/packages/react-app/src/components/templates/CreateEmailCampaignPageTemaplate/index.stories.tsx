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
import CreateEmailCampaignPageTemplate, { CampaignInfo } from "./index";
import {
  distributorFormState,
  emailState,
  tokenInfo,
} from "../../../utils/mockData";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Templates/CreateEmailCampaignPageTemplate",
  component: CreateEmailCampaignPageTemplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateEmailCampaignPageTemplate {...args} />
  </BrowserRouter>
);

export const Step1ButtonDisabled = Template.bind({});
Step1ButtonDisabled.args = {
  active: true,
  emailState: {
    ...emailState,
    targets: [],
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState,
};

export const Step1ButtonEnabled = Template.bind({});
Step1ButtonEnabled.args = {
  active: true,
  emailState: {
    ...emailState,
    quantity: "0",
    isValidQuantity: false,
  },
  distributorFormState,
};

export const Step2 = Template.bind({});
Step2.args = {
  active: true,
  tokenInfo: tokenInfo,
  emailState: {
    ...emailState,
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState: {
    ...distributorFormState,
    step: 2,
  },
};

export const Step3 = Template.bind({});
Step3.args = {
  active: true,
  tokenInfo: tokenInfo,
  emailState: {
    ...emailState,
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState: {
    ...distributorFormState,
    campaignName: "URL Campaign",
    step: 3,
  },
};

export const Step4 = Template.bind({});
Step4.args = {
  active: true,
  tokenInfo: tokenInfo,
  emailState: {
    ...emailState,
    rawTargets: [...Array(3)].map(() => uuidv4()),
    emailList: ["test1@example.com", "test2@example.com", "test3@example.com"],
  },
  distributorFormState: {
    ...distributorFormState,
    campaignName: "URL Campaign",
    step: 4,
  },
};
