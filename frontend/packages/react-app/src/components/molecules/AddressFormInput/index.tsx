import * as React from "react";
import { FormControl, InputLabel, Input, Box } from "@material-ui/core";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";

const AddressFormInput: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
  <Box width={1}>
    <FormControl fullWidth>
      <InputLabel htmlFor="contract-address">Contract Address</InputLabel>
      <Input
        id="contract-address"
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "tokenAddress:input",
            payload: { tokenAddress: event.target.value },
          })
        }
        value={state.inputTokenAddress}
        fullWidth
      />
    </FormControl>
  </Box>
);

export default AddressFormInput;
