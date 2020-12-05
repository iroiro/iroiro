import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignDetailPageTemaplate, { CampaignInfoProps } from "./index";
import { AccountToken, Target, CampaignInfo } from "../../../interfaces";

export default {
  title: "Templates/CampaignDetailPageTemaplate",
  component: CampaignDetailPageTemaplate,
} as Meta;

const Template: Story<CampaignInfoProps> = (args) => (
  <BrowserRouter>
    <CampaignDetailPageTemaplate {...args} />
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

const campaignInfo: CampaignInfo = {
  campaignInfoCid: "QmYdUkdEgQtn4viySEQie51JAwrC3xTyDqDbdWXWEwAz5J",
  campaignMetadata: {
    name: "Audiusフォロワーさん向けトークン配布キャンペーン！",
    description:
      "Audiusアカウントのフォロワーの方へトークンを配布します。手順はXXX...",
    image: "https://example.com/campaignimage.jpg",
  },
  claimAmount: "0",
  distributor: {
    id: "0x48889feca4574810e5a5b30b6b93146a837500fb",
  },
  id: "0xcc22b3199013627708d05fedf9b854bd7706a156",
  startDate: "20201212",
  status: 0,
  claimed: 10,
  depositAmount: "100000",
};

export const Default = Template.bind({});
Default.args = { tokenInfo, targets, targetNumber, campaignInfo };
