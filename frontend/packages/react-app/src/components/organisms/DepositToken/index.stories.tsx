import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DepositToken, { TokenInfo } from "./index";
import { tokenInfo } from "../../../utils/mockData";

export default {
  title: "Organisms/DepositToken",
  component: DepositToken,
} as Meta;

const Template: Story<TokenInfo> = (args) => (
  <BrowserRouter>
    <DepositToken {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = { tokenInfo };
