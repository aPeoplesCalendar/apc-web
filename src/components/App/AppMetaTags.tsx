import { Helmet } from "react-helmet-async";

export const AppMetaTags = () => {
  return (
    <Helmet>
      <meta
        name="description"
        content="A searchable calendar that catalogs liberation struggles around the world."
      />
      <meta property="og:title" content="A People's Calendar" />
      <meta
        property="og:description"
        content={`A People's Calendar is a searchable "on this day" style calendar that catalogs liberation struggles from all around the world.`}
      />
      <meta property="og:url" content="http://www.apeoplescalendar.org" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="A People's Calendar" />
      <meta
        name="twitter:description"
        content="A searchable calendar that catalogs liberation struggles around the world."
      />
      <meta name="twitter:url" content="http://www.apeoplescalendar.org" />
      <meta
        property="twitter:image"
        content="https://www.apeoplescalendar.org/apcIconBig.jpg"
      />
      <meta
        property="og:image:url"
        content="https://www.apeoplescalendar.org/apcIconBig.jpg"
      />
      <meta
        property="og:image:secure_url"
        content="https://www.apeoplescalendar.org/apcIconBig.jpg"
      />
    </Helmet>
  );
};
