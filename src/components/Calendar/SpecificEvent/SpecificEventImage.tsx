import { useState } from "react";
import { Box, Typography } from "@mui/material";
import * as styles from "./SpecificEvent.styles";

export interface ISpecificEventImageProps {
  publicImgURL: string | undefined;
  imgAltText: string | undefined;
}

export const SpecificEventImage = ({
  publicImgURL,
  imgAltText,
}: ISpecificEventImageProps) => {
  const [loading, setLoading] = useState<boolean>(!!publicImgURL);

  const handleImgLoad = () => {
    setLoading(false);
  };

  if (!publicImgURL) {
    return null;
  }

  return (
    <Box sx={styles.imageContainer}>
      {loading && <Box sx={styles.imgLoadingBox} data-testid="imgLoadingBox" />}
      <img
        src={publicImgURL}
        alt={imgAltText}
        onLoad={handleImgLoad}
        style={styles.imageSize}
      />
      {imgAltText && (
        <Typography data-testid="imgAltText">{imgAltText}</Typography>
      )}
    </Box>
  );
};
