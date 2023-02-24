import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  TumblrShareButton,
  TumblrIcon,
} from "react-share";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import {
  backgroundColor,
  contrastingBackgroundColor,
  thematicRed,
} from "../../../constants/globalStyles";
import * as styles from "./ShareIcons.styles";

export const ShareIcons = ({
  title = "",
  flexDirection = "row",
}: {
  title: string | undefined;
  flexDirection?: "row" | "column";
}) => {
  const shareLink = `https://www.apeoplescalendar.org${generatePath(
    ROUTES.SPECIFIC_EVENT,
    {
      eventName: stringToSlug(title),
    }
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast.dark("Link copied!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection,
        gap: "13px",
        marginTop: "7px",
        marginBottom: "7px",
      }}
    >
      <FacebookShareButton url={shareLink} style={styles.shareIconWrapper}>
        <FacebookIcon size={34} round />
      </FacebookShareButton>
      <RedditShareButton url={shareLink} style={styles.shareIconWrapper}>
        <RedditIcon size={34} round />
      </RedditShareButton>
      <TumblrShareButton url={shareLink} style={styles.shareIconWrapper}>
        <TumblrIcon size={34} round />
      </TumblrShareButton>
      <TwitterShareButton url={shareLink} style={styles.shareIconWrapper}>
        <TwitterIcon size={34} round />
      </TwitterShareButton>
      <IconButton
        sx={{
          backgroundColor,
          width: 34,
          height: 34,
          transition: "background-color .4s ease",
          ":hover": {
            backgroundColor: contrastingBackgroundColor,
          },
        }}
        onClick={handleCopy}
      >
        <LinkIcon
          sx={{
            transform: "rotate(135deg)",
            transition: "color .4s ease",
            ":hover": { color: thematicRed },
          }}
        />
      </IconButton>
    </Box>
  );
};
