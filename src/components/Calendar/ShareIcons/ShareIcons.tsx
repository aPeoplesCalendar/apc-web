import { Box } from "@mui/material";
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
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";

export const ShareIcons = ({
  title = "",
  flexDirection = "row",
}: {
  title: string | undefined;
  flexDirection?: "row" | "column";
}) => {
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
      <FacebookShareButton
        url={`https://www.apeoplescalendar.org${generatePath(
          ROUTES.SPECIFIC_EVENT,
          {
            eventName: stringToSlug(title),
          }
        )}`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <RedditShareButton
        url={`https://www.apeoplescalendar.org${generatePath(
          ROUTES.SPECIFIC_EVENT,
          {
            eventName: stringToSlug(title),
          }
        )}`}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TumblrShareButton
        url={`https://www.apeoplescalendar.org${generatePath(
          ROUTES.SPECIFIC_EVENT,
          {
            eventName: stringToSlug(title),
          }
        )}`}
      >
        <TumblrIcon size={32} round />
      </TumblrShareButton>
      <TwitterShareButton
        url={`https://www.apeoplescalendar.org${generatePath(
          ROUTES.SPECIFIC_EVENT,
          {
            eventName: stringToSlug(title),
          }
        )}`}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </Box>
  );
};
