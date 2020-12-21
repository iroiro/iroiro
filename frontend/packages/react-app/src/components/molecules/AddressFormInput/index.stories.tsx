import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AddressFormInput from "./index";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import { tokenListState } from "../../../utils/mockData";

export default {
  title: "Molecules/AddressFormInput",
  component: AddressFormInput,
} as Meta;

const Template: Story<ExplorePageTemplateProps> = (args) => (
  <BrowserRouter>
    <AddressFormInput {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenListState,
};

export const NoInput = Template.bind({});
NoInput.args = {
  state: {
    ...tokenListState,
    tokens: [],
    isOpen: true,
    inputTokenAddress: "",
    tokenAddress: "",
    type: "dashboard",
    color: "itblue",
  },
};
