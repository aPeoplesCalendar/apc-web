import { createTheme } from "@mui/material/styles";

export const backgroundColor = "#292929";

export const slightlyDarkerBlack = "#262626";

export const contrastingBackgroundColor = "#1a1a1a";

export const defaultTextColor = "#f5f5f5";

// navbar button text
export const secondaryTextColor = "#1f1f1f";

export const disabledButtonTextColor = "gray";

export const thematicRed = "#e62020";

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
          ":hover": {
            color: thematicRed,
          },
          transition: "color .4s ease",
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
          backgroundColor: contrastingBackgroundColor,
          boxShadow: "0px 0px 5px black",
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
