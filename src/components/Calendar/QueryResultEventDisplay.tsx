import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";

// make expandable
// allow for the addition of tags from the UI (means making list of tags and displaying them to the user somehow)

export const QueryResultEventDisplay = ({
  title,
  date,
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
      <p>{title}</p>
      <p>{date}</p>
      {imgSrc && (
        <div>
          <img src={fetchedImgSrc} alt={imgAltText} />
          {imgAltText && <p>{imgAltText}</p>}
        </div>
      )}
      <p>{otd}</p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((link) => (
          <a key={link} href={link}>
            {link}
          </a>
        ))}
      </div>

      {tags.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
};
