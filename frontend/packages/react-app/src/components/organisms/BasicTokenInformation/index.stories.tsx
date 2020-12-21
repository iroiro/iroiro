import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BasicTokenInformation, { BasicTokenInformationProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/BasicTokenInformation",
  component: BasicTokenInformation,
} as Meta;

const Template: Story<BasicTokenInformationProps> = (args) => (
  <BrowserRouter>
    <BasicTokenInformation {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};

export const Loading = Template.bind({});
Loading.args = {
  state: {
    ...tokenInformationState,
    token: undefined,
    campaigns: [],
    userBalance: "",
  },
};
