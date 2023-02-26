import { Helmet } from "react-helmet-async";
import { DatabaseEvent } from "../../../types/types";
import { stringToSlug } from "../../../utils/stringToSlug";

export interface IEventMetaTagsProps {
  previewEvent: DatabaseEvent;
  publicImgUrl?: string | undefined;
}

export const EventMetaTags = ({
  previewEvent,
  publicImgUrl = "https://www.apeoplescalendar.org/apcIconBig.jpg",
}: IEventMetaTagsProps) => {
  const { title, imgAltText, otd } = previewEvent;
  const slugifiedTitle = `apeoplescalendar.org/calendar/events/${stringToSlug(
    title
  )}`;
  return (
    <Helmet>
      <meta property="title" content={title} />
      <meta name="description" content={otd} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={otd} />
      <meta property="og:image" content={publicImgUrl} />
      <meta property="og:image:secure_url" content={publicImgUrl} />
      <meta property="og:image:alt" content={imgAltText} />
      <meta property="og:url" content={slugifiedTitle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={otd} />
      <meta property="twitter:image" content={publicImgUrl} />
      <meta property="twitter:image:alt" content={publicImgUrl} />
    </Helmet>
  );
};
