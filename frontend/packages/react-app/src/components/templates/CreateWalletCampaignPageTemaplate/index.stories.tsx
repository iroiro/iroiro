import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CreateWalletCampaignPageTemplate, { CampaignInfo } from "./index";
import { distributorFormState, tokenInfo } from "../../../utils/mockData";

export default {
  title: "Templates/CreateWalletCampaignPageTemaplate",
  component: CreateWalletCampaignPageTemplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateWalletCampaignPageTemplate {...args} />
  </BrowserRouter>
);

export const Step1 = Template.bind({});
Step1.args = {
  active: true,
  tokenInfo: tokenInfo,
  distributorFormState,
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
