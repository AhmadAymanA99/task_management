import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const TaskForm = ({ onSubmit, loadingAdd }) => {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            onSubmit(taskText);
            setTaskText("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center">
                <TextField label="Task" variant="outlined" size="small" value={taskText} onChange={(e) => setTaskText(e.target.value)} />

                <Button type="submit" color="success" variant="contained" size="small" sx={{ ml: 1 }} disabled={loadingAdd}>
                    {loadingAdd ? <CircularProgress color="inherit" size="1.2rem" /> : "Add"}
                </Button>
            </Box>
        </form>
    );
};

export default TaskForm;
