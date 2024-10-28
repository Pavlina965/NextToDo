"use client";
import React, { ChangeEvent, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

interface TaskFormProps {
  refreshTasks: () => void;
}
function AddTaskForm({ refreshTasks }: TaskFormProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskData = {
      title: taskTitle,
    };
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
      setTaskTitle("");
      refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="AddTask"
          required
          value={taskTitle}
          onChange={handleChange}
        ></TextField>
      </FormControl>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
}
export default AddTaskForm;
