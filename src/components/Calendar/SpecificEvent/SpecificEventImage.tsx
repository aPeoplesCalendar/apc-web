import { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
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
    <Box style={styles.imageContainer}>
      {loading && <Skeleton sx={styles.imgLoadingSkeleton} />}
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
