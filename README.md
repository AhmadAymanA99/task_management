# Tasks App

## Overview

The Tasks app is a lightweight React application designed for efficient task management. It enables users to effortlessly add, edit, delete, and mark tasks as completed. Utilizing Axios, the app seamlessly interacts with a RESTful API to perform CRUD operations.

## Features

### Task Management:

Add new tasks.

Edit task names.

Delete tasks.

Mark tasks as completed.

### Task List:

Display a draggable list of tasks.

Reorder tasks effortlessly.

### Filtering:

Filter tasks by status (All, Active, Completed).

### Pagination:

Display the first 15 tasks on the initial load.

### Register & Login:

Register & Log in with authentication token.

### Logout:

Log out and clear token.

## Getting Started
### Clone the Repository
```bash
git clone https://github.com/AhmadAymanA99/task_management.git
```
### Install Dependencies
```bash
npm install
```
### Run the Application
```bash
npm start
```
The application will be accessible at http://localhost:3000.


## API Integration
The application communicates with a RESTful API to perform CRUD operations on tasks. The API base URL and endpoints are defined in the src/APIs folder.

### API Functions
```python
createTask('task') # Create a new task.
getAllTasks() # Get all tasks (with optional limit).
updateTask('taskId', 'updatedTask') # Update a task.
deleteTask('taskId') # Delete a task.
```
## Usage
1. Adding a Task:

      a. Enter the task name in the input field.

      b. Click the "Add" button.
2. Editing a Task:

     a. Click the "Edit" button on a task.

     b. Modify the task name in the input field.

     c. Click the "Save" button.
3. Deleting a Task:

      Click the "Delete" button on a task.

4. Completing a Task:

      Click the "Complete" button on a task.
5. Filtering Tasks:

      Use the "All," "Active," and "Completed" buttons to filter tasks.
6. Reordering Tasks:

      Drag tasks to reorder them.
7. Logging Out:

      Click the "Logout" button to log out.
## Contributing

Feel free to contribute to the development of this application by creating issues or submitting pull requests.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)