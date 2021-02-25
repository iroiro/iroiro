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

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import { AppFooter } from "../../molecules/AppFooter";
import AppHeader from "../../molecules/AppHeader";

export interface AppFrameProps {
  children?: React.ReactNode;
}

const AppFrame = ({ ...props }) => {
  return (
    <div>
      <AppHeader />
      <Box m={"40px auto"} minWidth={320}>
        <Container maxWidth="md">
          <Box
            style={{
              boxSizing: "border-box",
              padding: 24,
              maxWidth: 860,
              margin: "0 auto",
              minWidth: 320,
            }}
          >
            {props.children}
          </Box>
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};

export default AppFrame;
