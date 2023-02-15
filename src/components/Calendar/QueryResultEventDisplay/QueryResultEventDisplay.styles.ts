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

export const img = {
  objectFit: "cover" as "cover",
  minHeight: "100%",
  width: "100%",
};

export const smallImgContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "7px",
};

export const smallImg = {
  maxHeight: "33vh",
  maxWidth: "90%",
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
