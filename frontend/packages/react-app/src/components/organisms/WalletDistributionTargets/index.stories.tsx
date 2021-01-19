import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WalletDistributionTargets, { TargetsProps } from "./index";
import { walletListState } from "../../../utils/mockData";

export default {
  title: "Organisms/WalletDistributionTargets",
  component: WalletDistributionTargets,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <WalletDistributionTargets {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  walletListState,
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  walletListState: {
    ...walletListState,
    targets: [],
  },
};
