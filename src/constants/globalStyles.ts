import { createTheme } from "@mui/material/styles";

export const backgroundColor = "#292929";

export const defaultTextColor = "#f5f5f5";

// navbar button text
export const secondaryTextColor = "#1f1f1f";

export const disabledButtonTextColor = "gray";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor,
          color: defaultTextColor,
          // enabled outlined textfield border
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline":
            {},
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ":disabled": {
            backgroundColor,
            color: disabledButtonTextColor,
          },
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
        label: {
          cursor: "pointer",
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultTextColor,
          },
        },
        notchedOutline: {
          borderColor: defaultTextColor,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: defaultTextColor,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: defaultTextColor,
        },
      },
    },
    MuiTab: {
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
