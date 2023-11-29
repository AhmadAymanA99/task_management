import React, { useState } from "react";
import { Box, List } from "@mui/material";
import Task from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Filter from "./Filter";

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgrey" : "",
    borderRadius: 5,
});

const TasksList = ({ tasks, onDelete, onMarkAsCompleted, editTask, setTasks, loadingDelete, taskId }) => {
    const [filter, setFilter] = useState("all"); // "all", "active", or "completed"

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(filteredTasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(reorderedTasks);
    };

    return (
        <Box display="flex" flexDirection="column">
            <Filter filter={filter} setFilter={setFilter} />
            <List>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                {filteredTasks.map((task, index) => (
                                    <Task key={task.id} task={task} onDelete={onDelete} onMarkAsCompleted={onMarkAsCompleted} onEditTask={editTask} index={index} filter={filter} loadingDelete={loadingDelete} taskId={taskId} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </Box>
    );
};

export default TasksList;
