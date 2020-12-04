import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import UserActivityCard, { UserActivityCardProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Molecules/UserActivityCard",
  component: UserActivityCard,
} as Meta;

const Template: Story<UserActivityCardProps> = (args) => (
  <BrowserRouter>
    <UserActivityCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  token: tokenInformationState.token,
  activity: tokenInformationState.activities[0],
};
