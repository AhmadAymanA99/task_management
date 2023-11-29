import React, { useEffect, useState } from "react";
import { Container, Typography, CssBaseline, Paper, Box, Button, Snackbar, Alert } from "@mui/material";
import TaskForm from "../Components/Tasks/TaskForm";
import TasksList from "../Components/Tasks/TasksList";
import { useNavigate } from "react-router-dom";
import { createTask, deleteTask, getAllTasks, updateTask } from "../APIs";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [taskId, setTaskId] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getAllTasks();
                setTasks(
                    response.data
                        .map((task) => ({
                            id: task.id,
                            text: task.title,
                            status: task.completed ? "completed" : "active",
                        }))
                        .slice(0, 5)
                );
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setOpenSnack(error?.response?.data);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (text) => {
        setLoadingAdd(true);
        const obj = { id: Date.now(), text, status: "active" };
        try {
            const response = await createTask(obj);
            setTasks([{ ...response.data }, ...tasks]);
            setLoadingAdd(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoadingAdd(false);
            setOpenSnack(error?.response?.data);
        }
    };

    const onDeleteTask = async (taskId) => {
        setLoadingDelete(true);
        setTaskId(taskId);
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
            setLoadingDelete(false);
            setTaskId(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoadingDelete(false);
            setTaskId(false);
            setOpenSnack(error?.response?.data);
        }
    };

    const markAsCompleted = (taskId) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: task.status === "active" ? "completed" : "active" } : task)));
    };

    const editTask = async (taskId, newText, status) => {
        const obj = { id: taskId, text: newText, status };
        try {
            await updateTask(taskId, { obj });
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task)));
        } catch (error) {
            setOpenSnack(error?.response?.data);
            console.error("Error fetching tasks:", error);
        }
    };

    const handleLogout = () => {
        // Clear localStorage or perform any other logout actions
        localStorage.removeItem("authToken");
        // Redirect to the login page or perform any other navigation
        navigate("/login");
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 9 }}>
            <CssBaseline />
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: 5,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={5}>
                    <Typography component="h1" variant="h5">
                        Tasks
                    </Typography>
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                <TaskForm onSubmit={addTask} loadingAdd={loadingAdd} />
                <Box mt={2} width="100%">
                    <TasksList tasks={tasks} onDelete={onDeleteTask} onMarkAsCompleted={markAsCompleted} editTask={editTask} setTasks={setTasks} loadingDelete={loadingDelete} taskId={taskId} />
                </Box>
            </Paper>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="error" sx={{ width: "100%" }}>
                    {openSnack}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Tasks;
