import * as React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: 100,
      height: "auto",
    },
    imageSmall: {
      width: 20,
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
        <img
          alt="logo"
          src={`${window.location.origin}/iroiro_logo.svg`}
          className={classes.image}
        />
      ) : (
        <img
          alt="logo"
          src={`${window.location.origin}/icon.png`}
          className={classes.imageSmall}
        />
      )}
    </Link>
  );
};

export default LogoButton;
