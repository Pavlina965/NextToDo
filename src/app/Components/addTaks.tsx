"use client";
import React, { ChangeEvent, useState } from "react";
import { Box, Button, FormControl, Modal, TextField } from "@mui/material";

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
    console.log("hello");
    setTaskTitle(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Task
      </Button>
      <Box component="form" onSubmit={handleSubmit}>
        <Modal open={open} onClose={handleClose}>
          <FormControl>
            <TextField
              label="AddTask"
              required
              value={taskTitle}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </FormControl>
        </Modal>
      </Box>
    </>
  );
}

export default AddTaskForm;
