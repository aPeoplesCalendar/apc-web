import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import * as styles from "./QueryResultEventDisplay.styles";

export interface IEventTagsProps {
  tags?: string[];
}

export const EventTags = ({ tags = [] }: IEventTagsProps) => {
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
          sx={styles.tagsLinkStyle}
          onClick={() => handleTagPress(tag)}
        >
          <Chip label={tag} />
        </Typography>
      ))}
    </Box>
  );
};
