import * as React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0'
import {BrowserRouter} from "react-router-dom";
import ExplorePageTemplate, { ExportPageTemplateProps } from "./index";
import {UserToken} from "../../../interfaces";

export default {
    title: "Templates/ExplorePageTemplate",
    component: ExplorePageTemplate
} as Meta

const Template: Story<ExportPageTemplateProps> = (args) => (
    <BrowserRouter>
        <ExplorePageTemplate {...args} />
    </BrowserRouter>
)

const tokens: UserToken[] = [
    {
        address: "0xabcd....1234",
        name: "Iroiro Token",
        symbol: "IRO",
        balance: "2000000000"
    },
    {
        address: "0xabcd....1234",
        name: "Storybook Token",
        symbol: "STR",
        balance: "1000000000"
    },
    {
        address: "0xabcd....1234",
        name: "Test Token",
        symbol: "TST",
        balance: "3000000000"
    }
]

export const Default = Template.bind({})
Default.args = {
    loadWeb3Modal: () => {},
    tokens,
    loading: false
}

export const NoTokens = Template.bind({})
NoTokens.args = {
    loadWeb3Modal: () => {},
    tokens: [],
    loading: false
}

export const Loading = Template.bind({})
Loading.args = {
    loadWeb3Modal: () => {},
    tokens: [],
    loading: true
}
