import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import * as styles from "./About.styles";
import { SOCIAL_LINKS, THREADS_LINK } from "../../constants/socialLinks";

export const About = () => {
  return (
    <Box>
      <Typography variant="h5" sx={styles.headerStyle}>
        About
      </Typography>
      <Box sx={styles.textContainer}>
        <Fade in={true} timeout={750}>
          <Typography>
            A People's Calendar (aPC) is a project that seeks to promote the
            worldwide history of working class movements and liberation
            struggles in the form of a searchable "On This Day" calendar.
          </Typography>
        </Fade>
        <Fade in={true} timeout={1100}>
          <Typography>
            aPC was inspired by historian Howard Zinn's work "A People's History
            of the United States". Zinn's scholarship and political activism
            demonstrated the power of mass working class movements, as well as
            the critical importance of knowing this history when we seek to
            change the present.
          </Typography>
        </Fade>
        <Fade in={true} timeout={1450}>
          <Typography>
            The greatest experts on any historical event or struggle will always
            be the people who live it, as well as the scholars who document it
            meticulously. Our ambition is to promote awareness of this history
            while emphasizing these perspectives.
          </Typography>
        </Fade>
        <Fade in={true} timeout={1800}>
          <Typography>
            {`Event anniversaries are posted daily on social media! You can follow
            us on `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href={SOCIAL_LINKS.facebook}
              target="_blank"
            >
              Facebook
            </Typography>
            {`, `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href={SOCIAL_LINKS.instagram}
              target="_blank"
            >
              Instagram
            </Typography>
            {`, `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href={THREADS_LINK}
              target="_blank"
            >
              Threads
            </Typography>
            {`, and `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href={SOCIAL_LINKS.reddit}
              target="_blank"
            >
              Reddit
            </Typography>
            .
          </Typography>
        </Fade>
        <Fade in={true} timeout={2150}>
          <Typography>
            {`Notice a typo, factual inaccuracy, or want to reach out for some
            other reason? `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href={generatePath(ROUTES.CONTACT)}
            >
              Contact us here
            </Typography>
            .
          </Typography>
        </Fade>
        <Fade in={true} timeout={1800}>
          <Typography>
            {`Are you a developer interested in contributing? `}
            <Typography
              component="a"
              sx={styles.aboutLinkStyle}
              href="https://github.com/aPeoplesCalendar/apc-web"
              target="_blank"
            >
              Our project is open source
            </Typography>
            .
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
};
