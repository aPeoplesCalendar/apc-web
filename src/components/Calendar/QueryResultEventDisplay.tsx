import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import { stringToSlug } from "../../utils/stringToSlug";
import { linkStyle } from "./Calendar.styles";
import { generateSpecificDayRoute } from "./Calendar.utils";

// make expandable
// allow for the addition of tags from the UI (means making list of tags and displaying them to the user somehow)

export const QueryResultEventDisplay = ({
  title,
  date,
  day,
  otd,
  imgSrc,
  imgAltText,
  description,
  links,
  tags,
}: Omit<DatabaseEvent, "id">) => {
  const [fetchedImgSrc, setFetchedImgSrc] = useState<string>("");

  const fetchImageUrl = async (imagePath: string) => {
    const { data } = await supabase.storage
      .from("event-photos")
      .getPublicUrl(imagePath);
    setFetchedImgSrc(data?.publicUrl ?? "");
  };

  useEffect(() => {
    if (imgSrc) {
      fetchImageUrl(imgSrc);
    }
  }, [imgSrc]);

  const paragraphs = description.split("\n\n");

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography
          component="a"
          sx={linkStyle}
          href={generatePath(ROUTES.SPECIFIC_EVENT, {
            eventName: stringToSlug(title),
          })}
        >
          {title}
        </Typography>
        <Typography
          component="a"
          sx={linkStyle}
          href={generateSpecificDayRoute(day)}
        >
          {date}
        </Typography>
      </div>
      {imgSrc && (
        <div>
          <img src={fetchedImgSrc} alt={imgAltText} />
          {imgAltText && <Typography>{imgAltText}</Typography>}
        </div>
      )}
      <Typography>{otd}</Typography>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph}>{paragraph}</Typography>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((link) => (
          <Typography key={link} href={link} component="a" sx={linkStyle}>
            {link}
          </Typography>
        ))}
      </div>
      {tags.map((tag) => (
        <Typography key={tag}>{tag}</Typography>
      ))}
    </div>
  );
};
