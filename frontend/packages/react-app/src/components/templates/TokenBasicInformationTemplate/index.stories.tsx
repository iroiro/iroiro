import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import {
  TokenBasicInformationTemplate,
  TokenBasicInformationProps,
} from "./index";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Templates/TokenBasicInformationTemplate",
  component: TokenBasicInformationTemplate,
} as Meta;

const Template: Story<TokenBasicInformationProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <TokenBasicInformationTemplate {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
