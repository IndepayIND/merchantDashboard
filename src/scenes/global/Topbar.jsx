import { Box, IconButton, useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {deleteAllCookies} from "../../data/api";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (Cookies.get("accessToken")) {
      deleteAllCookies();
      sessionStorage.removeItem("isLoggedIn"); // Remove logged-in state from session storage
      setIsLoggedIn(false); // Update the state immediately
    }
    navigate("/login"); // Navigate to the login page
  };

  const handleSetttingClick = () => {
    navigate("/settings"); // Navigate to the login page
  };

// Check for logged-in state on page load
  useEffect(() => {
    const storedLoggedInState = sessionStorage.getItem("isLoggedIn");
    if (storedLoggedInState === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => handleSetttingClick()}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => handleLoginClick()}>
          {isLoggedIn ? (
              <LogoutIcon />
          ) : (
              <LoginIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
