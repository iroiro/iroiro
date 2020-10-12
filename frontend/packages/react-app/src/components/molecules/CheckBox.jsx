import React from "react";
import {
  Box,
  Field,
  Checkbox
} from "rimble-ui";

const CheckBox = ({ handleCheckbox, checkboxValue, text }) => (
<Box>
  <Field label="">
    <Checkbox
      label={text}
      value={checkboxValue}
      onChange={e => handleCheckbox(!checkboxValue)}
    />
  </Field>
</Box>
)

export default CheckBox