import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignDetail, { CampaignDetailProps } from "./index";
import { CampaignInfo } from "../../../interfaces";

export default {
  title: "Organisms/CampaignDetail",
  component: CampaignDetail,
} as Meta;

const Template: Story<CampaignDetailProps> = (args) => (
  <BrowserRouter>
    <CampaignDetail {...args} />
  </BrowserRouter>
);

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
Default.args = {
  campaignInfo,
};
