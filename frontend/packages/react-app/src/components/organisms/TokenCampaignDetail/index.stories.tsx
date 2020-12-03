import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BasicTokenInformation, { TokenCampaignDetailProps } from "./index";
import { TokenInformationState } from "../../../interfaces";
import TokenCampaignDetail from "./index";

export default {
  title: "Organisms/TokenCampaignDetail",
  component: TokenCampaignDetail,
} as Meta;

const Template: Story<TokenCampaignDetailProps> = (args) => (
  <BrowserRouter>
    <BasicTokenInformation {...args} />
  </BrowserRouter>
);

const state: TokenInformationState = {
  token: {
    tokenAddress: "0xabcd...1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 18,
    totalSupply: 2000000000,
  },
  campaigns: [
    {
      id: "0xcampaign...1234",
      distributor: {},
      token: "0xtoken...1234",
      startDate: "1612137600",
      endDate: "1612137600",
      creator: {},
      campaignInfoCid: "cid",
      recipientsCid: "",
      claimAmount: "100",
      claimedNum: 10,
      status: 0,
      claims: [],
      checkRequests: [],
    },
  ],
  campaignInformationList: [
    {
      address: "0xcampaign...1234",
      name: "A Campaign",
      description: "This is a test campaign",
      image: "",
    },
  ],
  userBalance: "",
};

export const Default = Template.bind({});
Default.args = {
  state,
  campaignAddress: "0xcampaign...1234",
};

export const NotFound = Template.bind({});
NotFound.args = {
  state: {
    token: undefined,
    campaigns: [],
    campaignInformationList: [],
    userBalance: "",
  },
};
