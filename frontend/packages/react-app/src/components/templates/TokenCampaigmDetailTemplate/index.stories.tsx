import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenCampaignDetailTemplate, {
  TokenCampaignDetailTemplateProps,
} from "./index";

export default {
  title: "Templates/TokenCampaignDetailTemplate",
  component: TokenCampaignDetailTemplate,
} as Meta;

const Template: Story<TokenCampaignDetailTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenCampaignDetailTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: {
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
    userBalance: "1234500000",
  },
  campaignAddress: "0xcampaign...1234",
};
