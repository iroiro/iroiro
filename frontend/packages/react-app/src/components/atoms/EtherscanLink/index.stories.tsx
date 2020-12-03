import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import EtherscanLink, { EtherscanLinkProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/EtherscanLink",
  component: EtherscanLink,
} as Meta;

const Template: Story<EtherscanLinkProps> = (args) => (
  <BrowserRouter>
    <EtherscanLink {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
};
