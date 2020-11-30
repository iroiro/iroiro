import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SetTokenModal from "./index";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import { TokenListState } from "../../../reducers/tokens";

export default {
  title: "Organisms/SetTokenModal",
  component: SetTokenModal,
} as Meta;

const Template: Story<ExplorePageTemplateProps> = (args) => (
  <BrowserRouter>
    <SetTokenModal {...args} />
  </BrowserRouter>
);

const state: TokenListState = {
  tokens: [],
  isOpen: true,
  inputTokenAddress: "0xc6fDe3FD2Cc2b173aEC24cc3f267cb3Cd78a26B7",
  tokenAddress: "",
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
  },
};
