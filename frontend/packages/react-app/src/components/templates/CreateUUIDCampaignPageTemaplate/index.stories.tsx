import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CreateUUIDCampaignPageTemplate, { CampaignInfo } from "./index";
import { distributorFormState, tokenInfo } from "../../../utils/mockData";
import { uuidInitialState } from "../../../reducers/uuid";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Templates/CreateUUIDCampaignPageTemaplate",
  component: CreateUUIDCampaignPageTemplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateUUIDCampaignPageTemplate {...args} />
  </BrowserRouter>
);

export const Step1ButtonDisabled = Template.bind({});
Step1ButtonDisabled.args = {
  active: true,
  uuidState: {
    ...uuidInitialState,
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState,
};

export const Step1ButtonEnabled = Template.bind({});
Step1ButtonEnabled.args = {
  active: true,
  uuidState: {
    ...uuidInitialState,
    quantity: "0",
    isValidQuantity: false,
  },
  distributorFormState,
};

export const Step2 = Template.bind({});
Step2.args = {
  active: true,
  tokenInfo: tokenInfo,
  uuidState: {
    ...uuidInitialState,
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
  uuidState: {
    ...uuidInitialState,
    quantity: "100",
    isValidQuantity: true,
  },
  distributorFormState: {
    ...distributorFormState,
    campaignName: "UUID Campaign",
    step: 3,
  },
};

export const Step4 = Template.bind({});
Step4.args = {
  active: true,
  tokenInfo: tokenInfo,
  uuidState: {
    ...uuidInitialState,
    rawTargets: [...Array(10)].map(() => uuidv4()),
  },
  distributorFormState: {
    ...distributorFormState,
    campaignName: "UUID Campaign",
    step: 4,
  },
};
