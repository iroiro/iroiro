import * as React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0'
import {BrowserRouter} from "react-router-dom";
import TopPageBody from "./index";
import {Web3Props} from "../../../interfaces";

export default {
    title: "Molecules/TopPageBody",
    component: TopPageBody
} as Meta

const Template: Story<Web3Props> = () => (
    <BrowserRouter>
        <TopPageBody />
    </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
}
