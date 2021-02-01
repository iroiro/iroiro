import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { tokenInformationState } from "../../../utils/mockData";
import UserActivities, { UserActivitiesProps } from "./index";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Organisms/UserActivities",
  component: UserActivities,
} as Meta;

const Template: Story<UserActivitiesProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <UserActivities {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};

export const NoActivities = Template.bind({});
NoActivities.args = {
  state: { ...tokenInformationState, activities: [] },
};
