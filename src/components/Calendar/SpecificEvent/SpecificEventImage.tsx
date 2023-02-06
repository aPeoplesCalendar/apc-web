import { useState } from "react";
import { Typography } from "@mui/material";

export const SpecificEventImage = ({
  publicImgURL,
  imgAltText,
}: {
  publicImgURL: string | undefined;
  imgAltText: string | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(!!publicImgURL);

  const handleImgLoad = () => {
    setLoading(false);
  };

  if (!publicImgURL) {
    return null;
  }

  return (
    <div>
      {loading && <div>image loading</div>}
      <img src={publicImgURL} alt={imgAltText} onLoad={handleImgLoad} />
      {imgAltText && <Typography>{imgAltText}</Typography>}
    </div>
  );
};
