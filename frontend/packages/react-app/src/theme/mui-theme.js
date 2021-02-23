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

import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E25E89",
    },
    secondary: {
      main: "#48C5D5",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"'],
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
    },
  },
  overrides: {
    MuiStepConnector: {
      lineVertical: {
        minHeight: 10,
      },
    },
    MuiStepIcon: {
      root: {
        "&.MuiStepIcon-active": {
          color: "#48C5D5",
        },
        "&.MuiStepIcon-completed": {
          color: "#48C5D5",
        },
      },
    },
  },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.6rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.0rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
};

theme.typography.h5 = {
  fontSize: "0.8rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};

theme.typography.body1 = {
  fontSize: "1rem",
  fontWeight: "400",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};
export default theme;
