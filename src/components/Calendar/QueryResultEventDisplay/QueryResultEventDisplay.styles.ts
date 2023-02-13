import { linkStyle } from "../Calendar.styles";

export const largeEventContainer = {
  display: "grid",
  gridTemplateColumns: "30% 1fr",
  gap: "15px",
};

export const smallEventContainer = {
  display: "flex",
  flexDirection: "column" as "column",
  padding: "20px",
};

export const imgContainer = { overflow: "hidden" };

export const img = {
  objectFit: "cover" as "cover",
  minHeight: "100%",
  maxWidth: "250px",
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
  marginBottom: "10px",
};

export const smallEventLinks = {
  ...linkStyle,
  textAlign: "center",
};

export const tagsContainer = { display: "flex", gap: "10px" };