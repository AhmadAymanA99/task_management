import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, CssBaseline, Link } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        // Reset previous errors
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validate username
        if (!username) {
            setUsernameError("Please enter your username.");
        }

        // Validate email
        if (!email) {
            setEmailError("Please enter your email address.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Please enter a valid email address.");
        }

        // Validate password
        if (!password) {
            setPasswordError("Please enter your password.");
        }

        // Validate password confirmation
        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password.");
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
        }

        // If there are no errors, proceed with registration logic
        if (username && email && password && confirmPassword === password) {
            // Retrieve existing users from local storage or initialize an empty array
            const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            // Check if the username is already taken
            if (existingUsers.some((user) => user.username === username)) {
                setUsernameError("Username is already taken. Please choose another.");
                return;
            }

            // Add the new user to the array
            const newUser = { username, email, password };
            const updatedUsers = [...existingUsers, newUser];

            // Store the updated array in local storage
            localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

            // Redirect to login page
            navigate("/login");
        }
    };

    return (
        <StyledContainer component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Register
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
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                    />
                    <StyledButton fullWidth variant="contained" color="primary" onClick={handleRegister}>
                        Register
                    </StyledButton>
                    <Typography variant="body2" align="center" color="textSecondary">
                        Already have an account?{" "}
                        <Link component={RouterLink} to="/login" variant="body2">
                            Sign In
                        </Link>
                    </Typography>
                </StyledForm>
            </div>
        </StyledContainer>
    );
};

export default Register;
