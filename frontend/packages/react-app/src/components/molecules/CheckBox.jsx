import React from "react";
import {
  Box,
  Field,
  Checkbox,
  Text,
} from "rimble-ui";

const CheckBox = ({ handleCheckbox, checkboxValue, text }) => (
<Box>
  <Field label="">
    <Checkbox
      label={text}
      value={checkboxValue}
      onChange={e => handleCheckbox(e.target.checked)}
    />
  </Field>
</Box>
)

export default CheckBox