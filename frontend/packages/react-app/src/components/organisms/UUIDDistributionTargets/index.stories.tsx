import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import UUIDDistributionTargets, { TargetsProps } from "./index";
import { uuidInitialState } from "../../../reducers/uuid";

export default {
  title: "Organisms/UUIDDistributionTargets",
  component: UUIDDistributionTargets,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <UUIDDistributionTargets {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  uuidState: {
    ...uuidInitialState,
    quantity: "100",
    isValidQuantity: true,
  },
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  uuidState: uuidInitialState,
};
