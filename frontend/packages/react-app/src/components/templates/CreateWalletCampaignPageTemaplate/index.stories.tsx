import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CreateWalletCampaignPageTemplate, { CampaignInfo } from "./index";
import {
  walletListState,
  distributorFormState,
  tokenInfo,
} from "../../../utils/mockData";

export default {
  title: "Templates/CreateWalletCampaignPageTemaplate",
  component: CreateWalletCampaignPageTemplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateWalletCampaignPageTemplate {...args} />
  </BrowserRouter>
);

export const Step1NoFile = Template.bind({});
Step1NoFile.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState,
  walletListState: {
    ...walletListState,
    targets: [],
  },
};

export const Step1HaveFile = Template.bind({});
Step1HaveFile.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState,
  walletListState,
};

export const Step1Invalid = Template.bind({});
Step1Invalid.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState,
  walletListState: {
    ...walletListState,
    targets: [],
    fileformat: false,
  },
};

export const Step2 = Template.bind({});
Step2.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState: {
    ...distributorFormState,
    step: 2,
  },
};

export const Step3 = Template.bind({});
Step3.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState: {
    ...distributorFormState,
    step: 3,
  },
};
