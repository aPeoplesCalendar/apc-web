import {
  contrastingBackgroundColor,
  defaultTextColor,
} from "../../../constants/globalStyles";
import { linkStyle } from "../Calendar.styles";

export const largeEventContainer = {
  display: "grid",
  gridTemplateColumns: "30% minmax(0px, 1fr)",
  gap: "15px",
};

export const smallEventContainer = {
  display: "flex",
  flexDirection: "column" as "column",
  padding: "10px 20px",
};

export const imgContainer = { overflow: "hidden" };

export const imgLoadingSpinnerContainer = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

export const img = {
  objectFit: "cover" as "cover",
  minHeight: "100%",
  width: "100%",
  cursor: "pointer",
};

export const smallImgContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "7px",
};

export const smallImg = {
  maxHeight: "33vh",
  maxWidth: "90%",
  cursor: "pointer",
};

export const descriptionColumn = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: "10px",
  paddingTop: "10px",
  paddingRight: "10px",
};

export const smallEventLinks = {
  ...linkStyle,
  textAlign: "center",
  wordBreak: "break-word",
};

export const tagsContainer = { display: "flex", gap: "10px", flexWrap: "wrap" };

export const tagsLinkStyle = {
  ...linkStyle,
  fontWeight: "normal",
};

export const dateLinkWrapper = { fontWeight: "bold", color: defaultTextColor };

export const smallDateLinkContainer = { textAlign: "center" };

export const loadingSpinner = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  marginBottom: "10px",
};

export const imgLoadingBox = {
  backgroundColor: contrastingBackgroundColor,
  width: "25vh",
  height: "25vh",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
