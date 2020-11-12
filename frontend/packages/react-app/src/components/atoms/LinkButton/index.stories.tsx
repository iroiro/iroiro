import * as React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0'
import LinkOutlineButton, {LinkOutlineButtonProps} from "./index";
import {BrowserRouter} from "react-router-dom";

export default {
    title: "Atoms/LinkButton",
    component: LinkOutlineButton
} as Meta

const Template: Story<LinkOutlineButtonProps> = (args) => (
    <BrowserRouter>
        <LinkOutlineButton {...args} />
    </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
    p: 4,
    path: "/",
    text: "A button",
    mainColor: "#92DDE6"
}
