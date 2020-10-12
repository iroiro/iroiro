import React from "react";
import {
  Input,
  Field,
} from "rimble-ui";

const NumberInput = ({label, value, placeholder}) => (
  <div>
    <Field label={label} width={1}>
      <Input
        type="number"
        required
        value={value}
        width={1}
        placeholder={placeholder}
        readOnly
      />
    </Field>
  </div>
)

export default NumberInput