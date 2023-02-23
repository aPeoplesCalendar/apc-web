import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import * as styles from "./SpecificEvent.styles";

export interface ISpecificEventImageProps {
  publicImgURL: string | undefined;
  hasImage: boolean;
  imgAltText: string | undefined;
}

export const SpecificEventImage = ({
  publicImgURL,
  hasImage,
  imgAltText,
}: ISpecificEventImageProps) => {
  const [loading, setLoading] = useState<boolean>(hasImage);

  const handleImgLoad = () => {
    setLoading(false);
  };

  if (!hasImage) {
    return null;
  }

  return (
    <Box sx={styles.imageContainer}>
      {loading && (
        <Box sx={styles.imgLoadingBox} data-testid="imgLoadingBox">
          <CircularProgress />
        </Box>
      )}
      <img
        src={publicImgURL}
        alt={imgAltText}
        onLoad={handleImgLoad}
        style={{ ...styles.imageSize, display: loading ? "none" : "block" }}
      />
      {!loading && imgAltText && (
        <Typography data-testid="imgAltText">{imgAltText}</Typography>
      )}
    </Box>
  );
};
