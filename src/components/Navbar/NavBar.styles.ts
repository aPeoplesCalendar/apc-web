import {
  backgroundColor,
  defaultTextColor,
} from "../../constants/globalStyles";

export const mediumLogoStyle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

export const mediumNavBarButtonsContainer = {
  display: { xs: "none", md: "flex" },
  minHeight: "64px",
};

export const mediumLogoContainer = {
  ...mediumNavBarButtonsContainer,
  // this is a workaround for not being able to override a paddingLeft media query style on MuiContainer
  marginLeft: "-24px",
};

export const mediumAppBarButtons = {
  my: 2,
  color: defaultTextColor,
  display: "flex",
  backgroundColor,
  marginBottom: "0px",
  marginTop: "0px",
  fontSize: "15px",
  borderRadius: "0px",
};

export const smallNavContentStyle = {
  flexGrow: 1,
  display: { xs: "flex", md: "none" },
};

export const smallNavMenuStyle = {
  display: { xs: "block", md: "none" },
};

export const smallLogoStyle = {
  mr: 2,
  display: { xs: "flex", md: "none" },
  flexGrow: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};
