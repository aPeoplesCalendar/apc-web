import {
  backgroundColor,
  defaultTextColor,
  slightlyDarkerBlack,
  thematicRed,
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

export const navButtonHoverStyle = {
  ":hover": {
    backgroundColor: slightlyDarkerBlack,
    color: thematicRed,
    transition: "background-color .4s ease, color .4s ease",
  },
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
  ...navButtonHoverStyle,
};

export const smallNavContentStyle = {
  flexGrow: 1,
  display: { xs: "flex", md: "none" },
  justifyContent: "space-between",
};

export const smallNavMenuStyle = {
  display: { xs: "block", md: "none" },
};

export const smallLogoStyle = {
  display: { xs: "flex", md: "none" },
  flexGrow: 1,
  fontWeight: 600,
  letterSpacing: ".12rem",
  transition: "color .4s ease",
  color: "inherit",
  textDecoration: "none",
  width: "fit-content",
  "&:hover": {
    color: thematicRed,
  },
};

export const smallLogoContainer = {
  width: "50%",
  display: "flex",
  alignItems: "center",
};

export const socialLinksContainer = {
  marginLeft: "auto",
  alignItems: "center",
  gap: "10px",
  marginRight: "15px",
  display: { xs: "none", md: "flex" },
};

export const threadsAnchor = {
  borderRadius: "100%",
  textDecoration: "none",
  color: defaultTextColor,
  backgroundColor: "#141414",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "-3px",
};

export const threadsIconText = { marginBottom: "2px" };
