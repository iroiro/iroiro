import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import {
  TokenCampaignsDetailTemplate,
  TokenCampaignsDetailTemplateProps,
} from ".";
import { audiusState, tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Templates/TokenCampaignDetailTemplate",
  component: TokenCampaignsDetailTemplate,
} as Meta;

const Template: Story<TokenCampaignsDetailTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <TokenCampaignsDetailTemplate {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const Audius = Template.bind({});
Audius.args = {
  state: {
    campaign: tokenInformationState.campaigns[0],
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "audius",
    isTokenApproved: true,
    isTokenCheckFinished: false,
    isTokenRequested: false,
  },
  audiusState: audiusState,
};

export const Wallet = Template.bind({});
Wallet.args = {
  state: {
    campaign: tokenInformationState.campaigns[0],
    campaignAddress: "",
    isCampaignClaimable: true,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "wallet",
    isTokenApproved: true,
    isTokenCheckFinished: false,
    isTokenRequested: false,
  },
  audiusState: audiusState,
};
