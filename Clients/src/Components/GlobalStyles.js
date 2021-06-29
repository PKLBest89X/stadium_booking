import { createStyles, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif, Noto Sans Lao",
      },
    },
    html: {
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
    body: {
      backgroundColor: "#f4f6f8",
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
    "#root": {
      height: "100%",
      width: "100%",
    },
  })
);

const GlobalStyles = () => {
  useStyles();
  return null;
};

export default GlobalStyles;
