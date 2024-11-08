import { Box, Button, FormControl, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import React from "react";
import updateTask from "../utils/updateTask";
import { fetchTasks } from "../utils/fetchTasks";
interface EditTaskFormProps {
  task: TaskProps;
  onClose: () => void;
  loadTasks: () => void;
}
const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onClose,
  loadTasks,
}) => {
  const [updatedTask, setUpdatedTask] = React.useState<TaskProps>(task);
  // console.log(updatedTask);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: name === "dueDate" ? new Date(value).toISOString() : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask(updatedTask).then(() => {
      loadTasks();
    });
    onClose();
    console.log(fetchTasks());
    console.log("saving: " + updatedTask);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
      <FormControl component="form" onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="TaskTitle"
          required
          value={updatedTask.title}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description"
          value={updatedTask.description || ""}
          onChange={handleInputChange}
        />
        <TextField
          name="dueDate"
          label="DueDate"
          value={
            updatedTask.dueDate
              ? new Date(updatedTask.dueDate).toISOString().substring(0, 10)
              : ""
          }
          onChange={handleInputChange}
        />
        <Button type="submit">Save</Button>
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
