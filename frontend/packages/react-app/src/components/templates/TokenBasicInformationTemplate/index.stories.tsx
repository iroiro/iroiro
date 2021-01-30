import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { tokenInformationState } from "../../../utils/mockData";
import {
  TokenBasicInformationProps,
  TokenBasicInformationTemplate,
} from "./index";

export default {
  title: "Templates/TokenBasicInformationTemplate",
  component: TokenBasicInformationTemplate,
} as Meta;

const Template: Story<TokenBasicInformationProps> = (args) => (
  <BrowserRouter>
    <TokenBasicInformationTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {};
