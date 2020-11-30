import * as React from "react";
import { Form, Input, Field, Box } from "rimble-ui";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";

const AddressFormInput = ({
  color,
  state,
  dispatch,
}: ExplorePageTemplateProps) => (
  <Form>
    <Box width={[1]} px={2}>
      <Field label="Contract Address" width={1}>
        <Input
          type="text"
          required
          onChange={(event: any) =>
            dispatch({
              type: "tokenAddress:input",
              payload: { tokenAddress: event.target.value },
            })
          }
          value={state.inputTokenAddress}
          width={1}
        />
      </Field>
    </Box>
  </Form>
);

export default AddressFormInput;
