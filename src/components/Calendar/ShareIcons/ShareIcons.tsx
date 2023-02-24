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
import * as styles from "./ShareIcons.styles";

export const ShareIcons = ({
  title = "",
  otd = "",
  flexDirection = "row",
}: {
  title: string | undefined;
  otd: string | undefined;
  flexDirection?: "row" | "column";
}) => {
  const websiteLink = `https://www.apeoplescalendar.org${generatePath(
    ROUTES.SPECIFIC_EVENT,
    {
      eventName: stringToSlug(title),
    }
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(websiteLink);
    toast.dark("Link copied!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const defaultShareButtonProps = {
    title: otd,
    url: websiteLink,
    style: styles.shareIconWrapper,
  };

  const defaultIconProps = { size: 34, round: true };

  return (
    <Box sx={{ ...styles.shareIconsContainer, flexDirection }}>
      <FacebookShareButton {...defaultShareButtonProps}>
        <FacebookIcon {...defaultIconProps} />
      </FacebookShareButton>
      <RedditShareButton {...defaultShareButtonProps}>
        <RedditIcon {...defaultIconProps} />
      </RedditShareButton>
      <TumblrShareButton {...defaultShareButtonProps}>
        <TumblrIcon {...defaultIconProps} />
      </TumblrShareButton>
      <TwitterShareButton {...defaultShareButtonProps}>
        <TwitterIcon {...defaultIconProps} />
      </TwitterShareButton>
      <IconButton
        sx={styles.copyLinkWrapper}
        onClick={handleCopy}
        data-testid="copy-button"
      >
        <LinkIcon sx={styles.copyLinkIcon} />
      </IconButton>
    </Box>
  );
};
