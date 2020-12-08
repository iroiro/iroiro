import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AddressFormInput from "./index";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import { TokenListState } from "../../../interfaces";

export default {
  title: "Molecules/AddressFormInput",
  component: AddressFormInput,
} as Meta;

const Template: Story<ExplorePageTemplateProps> = (args) => (
  <BrowserRouter>
    <AddressFormInput {...args} />
  </BrowserRouter>
);

const state: TokenListState = {
  tokens: [],
  isOpen: true,
  inputTokenAddress: "0xc6fDe3FD2Cc2b173aEC24cc3f267cb3Cd78a26B7",
  tokenAddress: "",
  type: "dashboard",
  color: "itblue",
};

export const Default = Template.bind({});
Default.args = {
  state,
};

export const NoInput = Template.bind({});
NoInput.args = {
  state: {
    tokens: [],
    isOpen: true,
    inputTokenAddress: "",
    tokenAddress: "",
    type: "dashboard",
    color: "itblue",
  },
};
