import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E25E89",
    },
    secondary: {
      main: "#CAFC74",
    },
  },
  typography: {
    fontFamily: ['"Helvetica Neue"'],
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
export default theme;
