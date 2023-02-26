import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import { SocialIcon } from "react-social-icons";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import * as styles from "./ShareIcons.styles";
import { defaultTextColor } from "../../../constants/globalStyles";

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

  const defaultIconProps = {
    style: { width: 34, height: 34 },
    fgColor: defaultTextColor,
  };

  const facebookLink = `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams(
    { u: websiteLink }
  ).toString()}`;
  const redditLink = `https://www.reddit.com/submit?${new URLSearchParams({
    url: websiteLink,
    title: otd,
  })}`;
  const tumblrLink = `https://www.tumblr.com/widgets/share/tool?${new URLSearchParams(
    {
      canonicalUrl: websiteLink,
      tags: "OnThisDay",
      title,
      content: otd,
      posttype: "text",
    }
  )}`;
  const twitterLink = `https://twitter.com/intent/tweet?${new URLSearchParams({
    text: otd,
    url: websiteLink,
  })}`;

  return (
    <Box sx={{ ...styles.shareIconsContainer, flexDirection }}>
      <SocialIcon url={facebookLink} {...defaultIconProps} />
      <SocialIcon url={redditLink} {...defaultIconProps} />
      <SocialIcon url={tumblrLink} {...defaultIconProps} />
      <SocialIcon url={twitterLink} {...defaultIconProps} />
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
