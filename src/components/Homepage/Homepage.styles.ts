import { linkStyle } from "../Calendar/Calendar.styles";

export const header = {
  textAlign: "center",
  marginTop: "15px",
  marginBottom: "15px",
};

export const eventOTDHeader = { textAlign: "center", marginBottom: "10px" };

export const homepageTextContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "5px",
  marginBottom: "7px",
};

export const homepageText = (aboveMediumScreen: boolean) => ({
  fontSize: aboveMediumScreen ? "18px" : "16px",
});

export const homepageLinkStyle = (aboveMediumScreen: boolean) => ({
  ...linkStyle,
  ...homepageText,
  ...homepageText(aboveMediumScreen),
  fontWeight: "bold",
  wordBreak: "break-word",
});

export const viewMoreWrapper = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

export const buttonText = { color: "black", textDecoration: "none" };
