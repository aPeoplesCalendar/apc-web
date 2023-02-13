import { Helmet } from "react-helmet";

export const AppMetaTags = () => {
  return (
    <Helmet>
      <meta
        name="description"
        content="A searchable calendar that catalogs liberation struggles around the world."
        data-react-helmet="true"
      />
      <meta
        property="og:title"
        content="A People's Calendar"
        data-react-helmet="true"
      />
      <meta
        property="og:description"
        content={`A People's Calendar is a searchable "on this day" style calendar that catalogs liberation struggles from all around the world.`}
        data-react-helmet="true"
      />
      <meta
        property="og:image:url"
        content="https://www.apeoplescalendar.org/apcIconBig.jpg"
        data-react-helmet="true"
      />
      <meta
        property="og:image:secure_url"
        content="https://www.apeoplescalendar.org/apcIconBig.jpg"
        data-react-helmet="true"
      />
      <meta
        property="og:url"
        content="http://www.apeoplescalendar.org"
        data-react-helmet="true"
      />
    </Helmet>
  );
};
