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
import CreateWalletNFTCampaignStepper, {
  CreateWalletNFTCampaignStepperProps,
} from ".";
import { distributorFormState, walletListState } from "../../../utils/mockData";

export default {
  title: "Organisms/CreateWalletNFTCampaignStepper",
  component: CreateWalletNFTCampaignStepper,
} as Meta;

const Template: Story<CreateWalletNFTCampaignStepperProps> = (args) => (
  <BrowserRouter>
    <CreateWalletNFTCampaignStepper {...args} />
  </BrowserRouter>
);

export const StepOne = Template.bind({});
StepOne.args = {
  walletListState,
  distributorFormState: {
    ...distributorFormState,
    distributorType: "wallet-nft",
    step: 0,
  },
};

export const StepTwo = Template.bind({});
StepTwo.args = {
  ...StepOne.args,
  distributorFormState: {
    ...distributorFormState,
    ...StepOne.args.distributorFormState,
    step: 1,
  },
};
