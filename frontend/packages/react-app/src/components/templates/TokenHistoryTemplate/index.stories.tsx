import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenhistoryTemplate, TokenHistoryTemplateProps } from "./index";

export default {
  title: "Templates/TokenHistoryTemplate",
  component: TokenhistoryTemplate,
} as Meta;

const Template: Story<TokenHistoryTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenhistoryTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};
