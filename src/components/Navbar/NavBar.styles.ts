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

export const mediumPagesStyle = {
  flexGrow: 1,
  display: { xs: "none", md: "flex" },
};

export const mediumAppBarButtons = {
  my: 2,
  color: defaultTextColor,
  display: "block",
  backgroundColor,
  marginBottom: "0px",
  marginTop: "0px",
  fontSize: "15px",
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
