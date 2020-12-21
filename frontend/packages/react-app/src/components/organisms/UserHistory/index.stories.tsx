import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import UserHistory, { UserHistoryProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/UserHistory",
  component: UserHistory,
} as Meta;

const Template: Story<UserHistoryProps> = (args) => (
  <BrowserRouter>
    <UserHistory {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};

export const NoActivities = Template.bind({});
NoActivities.args = {
  state: {
    ...tokenInformationState,
    activities: [],
  },
};
