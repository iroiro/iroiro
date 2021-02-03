import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BasicTokenInformation from "./index";
import { initialValue, tokenReducer } from "../../../reducers/tokenContext";
import { TokenProvider } from "../../../context/token";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/BasicTokenInformation",
  component: BasicTokenInformation,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <BasicTokenInformation />
    </TokenProvider>
  </BrowserRouter>
);

const TemplateLoading: Story = () => (
  <BrowserRouter>
    <TokenProvider initialValue={initialValue} reducer={tokenReducer}>
      <BasicTokenInformation />
    </TokenProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
export const Loading = TemplateLoading.bind({});
