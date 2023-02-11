import { Box, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { linkStyle } from "../Calendar.styles";
import * as styles from "./QueryResultEventDisplay.styles";

export interface IEventTagsProps {
  tags: string[];
}

export const EventTags = ({ tags }: IEventTagsProps) => {
  const navigate = useNavigate();

  const handleTagPress = (tag: string) => {
    navigate({
      pathname: ROUTES.CALENDAR_SEARCH,
      search: `?tag=${tag}`,
    });
  };
  return (
    <Box sx={styles.tagsContainer}>
      {tags.map((tag) => (
        <Typography
          key={tag}
          component="a"
          sx={linkStyle}
          onClick={() => handleTagPress(tag)}
        >
          <Chip label={tag} />
        </Typography>
      ))}
    </Box>
  );
};
