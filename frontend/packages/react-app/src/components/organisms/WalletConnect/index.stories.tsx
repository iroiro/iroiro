import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WalletConnect from "./index";

export default {
  title: "Organisms/WalletConnect",
  component: WalletConnect,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <WalletConnect />
  </BrowserRouter>
);

export const Default = Template.bind({});
