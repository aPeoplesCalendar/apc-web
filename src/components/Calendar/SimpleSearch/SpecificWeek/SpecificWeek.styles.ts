import {
  contrastingBackgroundColor,
  defaultTextColor,
} from "../../../../constants/globalStyles";
import { linkStyle } from "../../Calendar.styles";

const tableBorder = `1px solid ${defaultTextColor}`;

export const weekContainerDesktop = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0px, 1fr))",
  border: tableBorder,
  borderLeft: "none",
  backgroundColor: contrastingBackgroundColor,
};

export const weekContainerMobile = {
  display: "flex",
  flexDirection: "column",
  border: tableBorder,
  borderLeft: "none",
  borderTop: "none",
  backgroundColor: contrastingBackgroundColor,
};

export const dayColumnWrapper = (mobile: boolean) => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  gridTemplateColumns: "minmax(0px, 1fr)",
  borderLeft: tableBorder,
  borderTop: mobile ? tableBorder : "none",
});

export const columnHeader = {
  borderBottom: tableBorder,
  textAlign: "center",
  padding: "5px",
  fontSize: "13px",
};

export const dayEventsWrapper = {
  padding: "7px",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  textAlign: "left",
};

export const loadingSpinner = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  marginBottom: "10px",
};

export const eventLink = (mobile: boolean) => ({
  ...linkStyle,
  transition: "color .4s ease",
  fontWeight: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  fontSize: mobile ? "14px" : "12px",
  cursor: "pointer",
});

export const dayLinkStyle = (isAboveMedium: boolean) => ({
  ...linkStyle,
  fontSize: isAboveMedium ? "1rem" : "unset",
  whiteSpace: "nowrap",
});
