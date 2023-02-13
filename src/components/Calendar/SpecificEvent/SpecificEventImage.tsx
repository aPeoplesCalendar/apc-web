import { useState } from "react";
import { Box, Typography } from "@mui/material";
import * as styles from "./SpecificEvent.styles";

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
    <Box sx={styles.imageContainer}>
      {loading && <Box sx={styles.imgLoadingBox} />}
      <img
        src={publicImgURL}
        alt={imgAltText}
        onLoad={handleImgLoad}
        style={styles.imageSize}
      />
      {imgAltText && <Typography>{imgAltText}</Typography>}
    </Box>
  );
};
