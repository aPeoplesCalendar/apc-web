import {
  backgroundColor,
  contrastingBackgroundColor,
  thematicRed,
} from "../../../constants/globalStyles";

export const shareIconWrapper = { display: "flex", alignItems: "center" };

export const copyLinkWrapper = {
  backgroundColor,
  width: 34,
  height: 34,
  transition: "background-color .4s ease",
  ":hover": {
    backgroundColor: contrastingBackgroundColor,
  },
};

export const copyLinkIcon = {
  transform: "rotate(135deg)",
  transition: "color .4s ease",
  ":hover": { color: thematicRed },
};

export const shareIconsContainer = {
  display: "flex",
  gap: "13px",
  marginTop: "7px",
  marginBottom: "7px",
};
