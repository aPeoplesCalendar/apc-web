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
      <meta name="description" content={otd} data-react-helmet="true" />
      <meta property="og:description" content={otd} />
      {publicImgUrl && (
        <>
          <meta property="og:image" content={publicImgUrl} />
          <meta property="og:image:secure_url" content={publicImgUrl} />
        </>
      )}
      {imgAltText && <meta property="og:image:alt" content={imgAltText} />}
      <meta property="og:url" content={slugifiedTitle} />
    </Helmet>
  );
};
