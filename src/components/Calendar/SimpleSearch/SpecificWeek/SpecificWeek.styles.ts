import { linkStyle } from "../../Calendar.styles";

export const weekContainerDesktop = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0px, 1fr))",
  border: "1px solid white",
  borderLeft: "none",
};

export const weekContainerMobile = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid white",
  borderLeft: "none",
  borderTop: "none",
};

export const dayColumnWrapper = (mobile: boolean) => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  gridTemplateColumns: "minmax(0px, 1fr)",
  borderLeft: "1px solid white",
  borderTop: mobile ? "1px solid white" : "none",
});

export const columnHeader = {
  borderBottom: "1px solid white",
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
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  fontSize: mobile ? "14px" : "12px",
  cursor: "pointer",
});
