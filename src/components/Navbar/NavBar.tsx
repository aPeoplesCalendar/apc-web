import { MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import * as styles from "./NavBar.styles";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router";

export const NavBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavItemClick = (pathname: string) => {
    handleCloseNavMenu();
    const month = `${new Date().getMonth() + 1}`;
    const day = `${new Date().getDate()}`;
    const search =
      pathname === ROUTES.CALENDAR_DAY ? `?day=${day}&month=${month}` : "";
    navigate({ pathname, search });
  };

  const pages = [
    {
      navText: "Calendar",
      route: ROUTES.CALENDAR_DAY,
    },
    {
      navText: "Search",
      route: ROUTES.CALENDAR_SEARCH,
    },
    {
      navText: "About",
      route: ROUTES.ABOUT,
    },
    {
      navText: "Contact",
      route: ROUTES.CONTACT,
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={styles.mediumLogoContainer}>
            <Button
              href={ROUTES.HOME}
              sx={styles.mediumAppBarButtons}
              variant="contained"
            >
              Home
            </Button>
          </Box>
          <Box sx={styles.smallNavContentStyle}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={styles.smallNavMenuStyle}
              data-testid="small-nav-links"
            >
              {pages.map(({ navText, route }) => (
                <MenuItem
                  key={navText}
                  onClick={() => handleNavItemClick(route)}
                  sx={styles.navButtonHoverStyle}
                >
                  <Typography
                    sx={styles.navButtonHoverStyle}
                    textAlign="center"
                  >
                    {navText}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box sx={styles.smallLogoContainer}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href={ROUTES.HOME}
                sx={styles.smallLogoStyle}
              >
                aPC
              </Typography>
            </Box>
          </Box>
          <Box
            sx={styles.mediumNavBarButtonsContainer}
            data-testid="full-nav-links"
          >
            {pages.map(({ navText, route }) => (
              <Button
                key={navText}
                onClick={() => handleNavItemClick(route)}
                sx={styles.mediumAppBarButtons}
                variant="contained"
              >
                {navText}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
