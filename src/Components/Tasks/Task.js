// Task.js
import React, { useState } from "react";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, TextField, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    borderRadius: 5,
    background: isDragging ? "lightgreen" : "",
    ...draggableStyle,
});

const Task = ({ task, onDelete, onMarkAsCompleted, onEditTask, index, filter, loadingDelete, taskId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskText, setEditedTaskText] = useState(task.text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTaskText(task.text);
    };

    const handleSaveEdit = () => {
        onEditTask(task.id, editedTaskText, task.status);
        setIsEditing(false);
    };

    return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index} isDragDisabled={filter !== "all"}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <ListItem>
                        {isEditing ? (
                            <>
                                <TextField size="small" variant="outlined" value={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)} />
                                <Button size="small" onClick={handleSaveEdit}>
                                    Save
                                </Button>
                                <Button size="small" color="error" onClick={handleCancelEdit}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <ListItemText sx={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis" }} primary={task.text} />
                                <ListItemSecondaryAction>
                                    <Button variant={task.status === "active" ? "contained" : "outlined"} color={task.status === "active" ? "primary" : "success"} size="small" onClick={() => onMarkAsCompleted(task.id)}>
                                        {task.status}
                                    </Button>
                                    <IconButton color="default" edge="end" aria-label="edit" onClick={handleEditClick}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
                                        {loadingDelete && taskId === task.id ? <CircularProgress color="error" size="1.4rem" /> : <DeleteIcon />}
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
