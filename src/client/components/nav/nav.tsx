import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import styles from "./nav.module.scss";
import { colors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contextProviders/user/UserContext";

const Nav = ({ signOut }: { signOut: Function }) => {
  const user = useContext(UserContext);
  const navigateTo = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleSettingsClick = (link: string) => {
    handleCloseUserMenu();
    navigateTo(link);
  };

  const handleSignInOut = () => {
    if (user) {
      signOut(user);
    } else {
      navigateTo("/signin");
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (link: string) => {
    handleCloseNavMenu();
    navigateTo(link);
  };

  const pages = [{ title: "Recipes", link: "/" }];
  const settings = [
    {
      title: "Profile",
      link: user ? `/profile/${user._id}` : "/profile/639122103af9ff52d272424e",
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: colors.primary }}
    >
      <Box
        sx={{
          margin: {
            xl: "0 180px",
            lg: "0 160px",
            md: "0 100px",
            sm: "0 64px",
            xs: "0 32px",
          },
        }}
      >
        <Toolbar disableGutters>
          <FastfoodIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: colors.primary,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            Sandwiches
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handlePageClick(page.link)}
                >
                  <p className={styles.tertiary}> {page.title} </p>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sandwiches
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handlePageClick(page.link)}
                sx={{ my: 2, color: "#515151", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, padding: "8px", borderRadius: "15px" }}
              >
                <PersonIcon sx={{ marginRight: "4px" }} />
                <p className="caption">{user && user.username}</p>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user &&
                settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => {
                      handleSettingsClick(setting.link);
                    }}
                  >
                    <p className={styles.tertiary}>{setting.title}</p>
                  </MenuItem>
                ))}
              <MenuItem key="sign-in-out" onClick={handleSignInOut}>
                <p className={styles.tertiary}>
                  {user ? "Sign Out" : "Sign In"}
                </p>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Nav;
