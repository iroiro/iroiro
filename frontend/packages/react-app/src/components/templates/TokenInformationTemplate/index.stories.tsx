import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { tokenInformationState } from "../../../utils/mockData";
import TokenInformationTemplate, {
  TokenInformationTemplateProps,
} from "./index";

export default {
  title: "Templates/TokenInformationTemplate",
  component: TokenInformationTemplate,
} as Meta;

const Template: Story<TokenInformationTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenInformationTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};
