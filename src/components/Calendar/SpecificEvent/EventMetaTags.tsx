import { Helmet } from "react-helmet";
import { DatabaseEvent } from "../../../types/types";
import { stringToSlug } from "../../../utils/stringToSlug";

export interface IEventMetaTagsProps {
  previewEvent: DatabaseEvent;
  publicImgUrl?: string | undefined;
}

export const EventMetaTags = ({
  previewEvent,
  publicImgUrl,
}: IEventMetaTagsProps) => {
  const { title, imgAltText, otd } = previewEvent;
  const slugifiedTitle = `apeoplescalendar.org/calendar/events/${stringToSlug(
    title
  )}`;
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={otd} />
      {publicImgUrl && <meta property="og:image" content={publicImgUrl} />}
      {imgAltText && <meta property="og:image:alt" content={imgAltText} />}
      <meta property="og:url" content={slugifiedTitle} />
    </Helmet>
  );
};
