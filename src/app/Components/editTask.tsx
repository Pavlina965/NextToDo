import { Box, FormControl, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import React from "react";

const EditTaskForm = ({ task }: { task: TaskProps }) => {
  const [updatedTask, setUpdatedTask] = React.useState<TaskProps>(task);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTask({ ...updatedTask, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Box>
      <FormControl>
        <TextField
          label="TaskTitle"
          required
          value={updatedTask.title}
          onChange={(event) => (task.title = event.target.value)}
        />
        <TextField
          label="Description"
          value={task.description}
          onChange={(event) => (task.description = event.target.value)}
        />
        <TextField
          label="DueDate"
          value={task.dueDate}
          onChange={(event) => (task.dueDate = new Date(event.target.value))}
        />
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
