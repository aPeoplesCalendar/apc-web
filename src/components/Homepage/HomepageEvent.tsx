import { useEffect, useState } from "react";
import { Paper, Skeleton, Typography } from "@mui/material";
import { supabase } from "../../supabaseClient";

export interface IHomepageEventProps {
  loading: boolean;
  title: string | undefined;
  date: string | undefined;
  otd: string | undefined;
  imgSrc: string | undefined;
  imgAltText: string | undefined;
}

export const HomepageEvent = ({
  loading,
  title,
  date,
  otd,
  imgSrc,
  imgAltText,
}: IHomepageEventProps) => {
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

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Paper>
      <Typography>{title}</Typography>
      <Typography>{date}</Typography>
      <div>
        <img src={fetchedImgSrc} alt={imgAltText} />
      </div>
      <Typography>{otd}</Typography>
    </Paper>
  );
};
