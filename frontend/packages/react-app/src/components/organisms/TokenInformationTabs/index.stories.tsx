import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenInformationTabs from "./index";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenInformationTemplateProps } from "../../templates/TokenInformationTemplate";

export default {
  title: "Organisms/TokenInformationTabs",
  component: TokenInformationTabs,
} as Meta;

const Template: Story<TokenInformationTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenInformationTabs {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};
