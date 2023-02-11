import { createTheme } from "@mui/material/styles";

export const backgroundColor = "#292929";

export const defaultTextColor = "#f5f5f5";

// navbar button text
export const secondaryTextColor = "#1f1f1f";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor,
          color: defaultTextColor,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor,
          color: defaultTextColor,
          fontSize: "15px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "0px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: defaultTextColor,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor,
          color: defaultTextColor,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor,
          color: defaultTextColor,
        },
      },
    },
  },
  palette: {
    primary: {
      main: defaultTextColor,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    allVariants: {
      color: defaultTextColor,
    },
  },
});
