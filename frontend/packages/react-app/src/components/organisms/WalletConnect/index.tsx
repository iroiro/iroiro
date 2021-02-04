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
import { Box, Typography } from "@material-ui/core";
import WalletButton from "../../atoms/WalletButton";

const WalletConnect: React.FC = () => (
  <>
    <Box m={5} style={{ textAlign: "center" }}>
      <Typography>Please connect your ethereum wallet</Typography>
      <Box m={4} style={{ display: "flex", justifyContent: "center" }}>
        <WalletButton />
      </Box>
    </Box>
  </>
);

export default WalletConnect;
