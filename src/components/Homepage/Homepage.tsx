import { Skeleton } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import { HomepageEvent } from "./HomepageEvent";

export const Homepage = () => {
  const [eventOTD, setEventOTD] = useState<DatabaseEvent>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEventOfTheDay = async () => {
    setLoading(true);
    // format of MM/DD/ no zero pads
    const todayString = `${new Date().getMonth() + 1}/${new Date().getDate()}/`;
    const { data: todayEvents } = await supabase
      .from("eventLibrary")
      .select()
      .like("date", `${todayString}%`);
    setEventOTD(
      todayEvents?.reduce(
        (maxEvent: DatabaseEvent, currentEvent: DatabaseEvent) =>
          maxEvent.description.length > currentEvent.description.length
            ? maxEvent
            : currentEvent
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchEventOfTheDay();
  }, []);

  return (
    <div>
      <Typography variant="h3">A People's Calendar</Typography>
      <Typography>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Typography>
      <Typography>
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
      {loading && <Skeleton />}
      {!loading && eventOTD && (
        <HomepageEvent
          title={eventOTD.title}
          date={eventOTD.date}
          otd={eventOTD.otd}
          imgSrc={eventOTD.imgSrc}
          imgAltText={eventOTD.imgAltText}
        />
      )}
    </div>
  );
};
