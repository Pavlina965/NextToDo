import { Box, Button, FormControl, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import React from "react";

interface FormData {
  [key: string]: unknown | undefined;
}
const EditTaskForm = ({ task }: { task: TaskProps }) => {
  const [updatedTask, setUpdatedTask] = React.useState<TaskProps>(task);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: name === "dueDate" ? new Date(value).toISOString() : value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    task: TaskProps
  ) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControl
        component="form"
        onSubmit={(event) => handleSubmit(event, task)}
      >
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
        <Button type="submit">Save</Button>
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
