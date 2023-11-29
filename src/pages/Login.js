import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, CssBaseline, Link } from "@mui/material";
import { styled } from "@mui/system";
import { generateToken } from "../Components/helpers";

const StyledContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Reset previous errors
        setUsernameError("");
        setPasswordError("");

        // Validate username
        if (!username) {
            setUsernameError("Please enter your username.");
        }

        // Validate password
        if (!password) {
            setPasswordError("Please enter your password.");
        }

        // If there are no errors, proceed with login logic
        if (username && password) {
            // Retrieve registered users from local storage
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            // Find the user with matching credentials
            const matchingUser = registeredUsers.find((user) => (user.username === username || user.email === username) && user.password === password);

            if (matchingUser) {
                // Generate a simple token (for demonstration purposes)
                const token = generateToken();
                // Save the token in local storage
                localStorage.setItem("authToken", token);

                navigate("/tasks");
            } else {
                // Display an error for incorrect login credentials
                setUsernameError("Invalid username or password.");
                setPasswordError("Invalid username or password.");
            }
        }
    };

    return (
        <StyledContainer component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <StyledForm>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!usernameError}
                        helperText={usernameError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <StyledButton fullWidth variant="contained" color="primary" onClick={handleLogin}>
                        Sign In
                    </StyledButton>
                    <Typography variant="body2" align="center" color="textSecondary">
                        Don't have an account?{" "}
                        <Link component={RouterLink} to="/register" variant="body2">
                            Sign Up
                        </Link>
                    </Typography>
                </StyledForm>
            </div>
        </StyledContainer>
    );
};

export default LoginPage;
