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
import { Box, Typography, Card, Button, Modal } from "@material-ui/core";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import AddressFormInput from "../../molecules/AddressFormInput";

const SetTokenModal: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
  <Modal
    disablePortal
    disableEnforceFocus
    disableAutoFocus
    open={state.isOpen}
    onClose={() => dispatch({ type: "modal:close" })}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Card>
      <Box p={4} mb={3}>
        <Typography variant={"h4"}>Set your token address</Typography>
        <Box mt={2}>
          <AddressFormInput state={state} dispatch={dispatch} />
        </Box>
      </Box>

      <Box
        display="flex"
        px={4}
        py={3}
        borderTop={1}
        borderColor={"#E8E8E8"}
        justifyContent={"flex-end"}
      >
        <Box>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: "modal:close" })}
          >
            Cancel
          </Button>
        </Box>
        <Box ml={3}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "tokenAddress:add" })}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Card>
  </Modal>
);

export default SetTokenModal;
