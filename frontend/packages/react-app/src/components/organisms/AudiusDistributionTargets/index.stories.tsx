import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AudiusDistributionTargets, { TargetsProps } from "./index";
import { audiusState } from "../../../utils/mockData";

export default {
  title: "Organisms/AudiusDistributionTargets",
  component: AudiusDistributionTargets,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <AudiusDistributionTargets {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  audiusState,
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  audiusState: {
    ...audiusState,
    followers: [],
  },
};
