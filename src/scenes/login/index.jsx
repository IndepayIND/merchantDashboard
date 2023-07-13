import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import baseUrl from "../../data/apiConfig";

const LoginScreen = ({ onLogin }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform validation or authentication logic here
        // For simplicity, let's assume the login is successful
        if (username && password) {
            const encodedKey = btoa(`${username}:${password}`);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encodedKey}`,
                },
            };

            fetch(`${baseUrl}/api/auth/token`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data here
                    if (data.status) {
                        const { token, refreshToken } = data.data;
                        Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
                        Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "strict" });
                        // For simplicity, let's assume the authentication is successful and set the username as the logged-in user
                        sessionStorage.setItem("isLoggedIn", "true"); // Store logged-in state in session storage
                        navigate("/");
                    } else {
                        // Handle any error messages or failed login attempts
                    }
                })
                .catch(error => {
                    // Handle any network errors or failed API requests
                });
        }
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.primary,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                        color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.primary,
                    },
                    "& .MuiInputLabel-root": {
                        color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.primary,
                    },
                }}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                        color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.primary,
                    },
                    "& .MuiInputLabel-root": {
                        color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.primary,
                    },
                }}
            />
            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default LoginScreen;
