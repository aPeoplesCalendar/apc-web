import { Helmet } from "react-helmet";
import { DatabaseEvent } from "../../../types/types";
import { stringToSlug } from "../../../utils/stringToSlug";

export interface IEventMetaTagsProps {
  previewEvent: DatabaseEvent;
  // optionally overwrite event title and description
  alternativeTitle?: string;
  alternativeDescription?: string;
}

export const EventMetaTags = ({
  previewEvent,
  alternativeTitle,
  alternativeDescription,
}: IEventMetaTagsProps) => {
  const { title, imgSrc, imgAltText, otd } = previewEvent;
  const slugifiedTitle = `apeoplescalendar.org/calendar/events/${stringToSlug(
    title
  )}`;
  return (
    <Helmet>
      <meta property="og:title" content={alternativeTitle ?? title} />
      <meta property="og:description" content={alternativeDescription ?? otd} />
      <meta property="og:image" content={imgSrc} />
      {imgAltText && <meta property="og:image:alt" content={imgAltText} />}
      <meta property="og:url" content={slugifiedTitle} />
    </Helmet>
  );
};
