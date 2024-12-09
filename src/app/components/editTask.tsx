import { Box, Button, FormControl, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import React from "react";
import updateTask from "../utils/updateTask";
import { fetchTasks } from "../utils/fetchTasks";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
interface EditTaskFormProps {
  task: TaskProps;
  onClose: () => void;
  refreshTasks: () => void;
}
const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onClose,
  refreshTasks,
}) => {
  const [updatedTask, setUpdatedTask] = React.useState<TaskProps>(task);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const HandleDateChange = (value: Dayjs | null) => {
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      dueDate: value ? value.toDate() : undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask(updatedTask).then(() => {
      refreshTasks();
    });
    onClose();

    console.log(fetchTasks());
    console.log("saving: " + updatedTask);
  };
  return (
    <Box
      sx={{
        width: "300px",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          p: 2,
          borderRadius: "5px",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ pb: 2 }}
          name="title"
          label="TaskTitle"
          required
          value={updatedTask.title}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ pb: 2 }}
          name="description"
          label="Description"
          value={updatedTask.description || ""}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="DD-MM-YYYY"
            value={updatedTask.dueDate ? dayjs(updatedTask.dueDate) : null}
            sx={{ pb: 2 }}
            name="dueDate"
            label="Due date"
            onChange={HandleDateChange}
          />
        </LocalizationProvider>
        <Button type="submit">Save</Button>
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
