import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ApproveToken, { TokenInfo } from "./index";
import { tokenInfo, distributorFormState } from "../../../utils/mockData";

export default {
  title: "Organisms/ApproveToken",
  component: ApproveToken,
} as Meta;

const Template: Story<TokenInfo> = (args) => (
  <BrowserRouter>
    <ApproveToken {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = { tokenInfo, distributorFormState };

export const Approved = Template.bind({});
Approved.args = {
  tokenInfo: {
    ...tokenInfo,
    allowance: "1000",
  },
  distributorFormState,
};
