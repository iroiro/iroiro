import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CreateCampaignPageTemaplate, { CampaignInfo } from "./index";
import { AccountToken, Target } from "../../../interfaces";

export default {
  title: "Templates/CreateCampaignPageTemaplate",
  component: CreateCampaignPageTemaplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateCampaignPageTemaplate {...args} />
  </BrowserRouter>
);

const tokenInfo: AccountToken = {
  token: {
    id: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
    name: "TestUsdtToken",
    symbol: "TUSDT",
    decimals: 18,
  },
  balance: "8888888",
};

const targets: Target[] = [
  {
    handle: "sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "username sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "sample",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "username sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
];

const targetNumber: number = 1234567890123450;

export const Default = Template.bind({});
Default.args = { tokenInfo, targets, targetNumber };
