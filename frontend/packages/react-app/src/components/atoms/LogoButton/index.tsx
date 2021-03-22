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
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      width: 100,
      height: "auto",
    },
    imageSmall: {
      width: 74,
      height: "auto",
    },
  })
);

const LogoButton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      {matches ? (
        <img alt="logo" src={`iroiro_logo.svg`} className={classes.image} />
      ) : (
        <img
          alt="logo"
          src={`iroiro_logo.svg`}
          className={classes.imageSmall}
        />
      )}
    </Link>
  );
};

export default LogoButton;
