import { contrastingBackgroundColor } from "../../../constants/globalStyles";
import { linkStyle } from "../Calendar.styles";

export const headerInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "center",
  textAlign: "center",
};

export const headerLoadingSkeleton = {
  width: "50%",
  height: "50px",
  margin: "auto",
  marginBottom: "-10px",
};

export const imageContainer = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export const paragraphsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export const paragraphsLoadingSkeleton = {
  height: "300px",
  marginTop: "-55px",
  marginBottom: "-55px",
};

export const readMoreContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  marginTop: "10px",
  marginBottom: "15px",
};

export const imageSize = { maxHeight: "50vh", maxWidth: "90%", margin: "auto" };

export const loadingSpinner = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  marginBottom: "10px",
};

export const imgLoadingBox = {
  backgroundColor: contrastingBackgroundColor,
  width: "275px",
  height: "300px",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const container = {
  marginTop: "20px",
};

export const specificEventLinkStyle = {
  ...linkStyle,
  fontWeight: "normal",
};

export const tagsContainer = {
  marginTop: "15px",
  marginBottom: "10px",
};

export const dateLinkContainer = {
  textAlign: "center",
};

export const cardPadding = (isNotMobile: boolean) => ({
  padding: isNotMobile ? "30px" : "16px",
  paddingTop: "16px",
  paddingBottom: "16px",
  minHeight: "400px",
});
