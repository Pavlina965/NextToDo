"use client";
import React, { ChangeEvent, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

// interface TodoFormProps {
//   addTask: (task: string) => void;
// }
function TodoForm() {
  const [task, setTask] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // addTask(task);sS
    // setTask("");
    try {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponseMessage("Task ${task.title} added successfully");
      } else {
        setResponseMessage("Error adding task");
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error adding task");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="Todo"
          required
          value={task}
          onChange={handleChange}
        ></TextField>
      </FormControl>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
}
export default TodoForm;
