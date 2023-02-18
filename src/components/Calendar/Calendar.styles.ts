import { defaultTextColor, thematicRed } from "../../constants/globalStyles";

export const linkStyle = {
  textDecoration: "none",
  color: defaultTextColor,
  fontWeight: "bold",
  ":hover": { color: thematicRed },
  transition: "color .4s ease",
  wordBreak: "break-all",
};
