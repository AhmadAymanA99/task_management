import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
    baseURL,
});

// Define your API endpoints
const task = "/todos";

// CRUD operations

// Create a new task
const createTask = (data) => api.post(task, data);

// Read all tasks
const getAllTasks = () => api.get(task);

// Update a task
const updateTask = (taskId, updatedTask) => api.put(`${task}/${taskId}`, updatedTask);

// Delete a task
const deleteTask = (taskId) => api.delete(`${task}/${taskId}`);

// Export your API functions
export { createTask, getAllTasks, updateTask, deleteTask };
