/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SelectTokenInput, { SelectTokenInputprops, TokenOption } from ".";

export default {
  title: "Atoms/SelectTokenInput",
  component: SelectTokenInput,
} as Meta;

const Template: Story<SelectTokenInputprops> = (args) => {
  const [value, setValue] = React.useState<TokenOption>({
    tokenName: "",
    tokenAddress: "",
  });
  console.log("value:", value);

  const handleChange = (value: TokenOption) => {
    console.log(value);
    setValue(value);
  };

  return <SelectTokenInput {...args} value={value} onChange={handleChange} />;
};

const tokens = [
  { tokenName: "token", tokenAddress: "0x000000" },
  { tokenName: "iroiro", tokenAddress: "0x000000" },
];

export const Default = Template.bind({});
Default.args = {
  label: "Choose Token",
  options: tokens,
};
