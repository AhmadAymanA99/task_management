import React from "react";
import { Button, ButtonGroup } from "@mui/material";

function Filter({ filter, setFilter }) {
    return (
        <ButtonGroup sx={{ marginBottom: 2, alignSelf: "center" }}>
            <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
                All
            </Button>
            <Button variant={filter === "active" ? "contained" : "outlined"} onClick={() => setFilter("active")}>
                Active
            </Button>
            <Button variant={filter === "completed" ? "contained" : "outlined"} onClick={() => setFilter("completed")}>
                Completed
            </Button>
        </ButtonGroup>
    );
}

export default Filter;
