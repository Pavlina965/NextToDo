"use client";
import React, { useState } from "react";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import addTask from "../utils/addTask";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
// import CreateProjectForm from "./createProject";
interface TaskFormProps {
  refreshTasks: () => void;
}
function CreateTaskForm({ refreshTasks }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskProps>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const HandleDateChange = (value: Dayjs | null) => {
    setTask((prevTask) => ({
      ...prevTask,
      // dueDate: value ? value.utc().toDate() : undefined,
      dueDate: value ? value.toDate() : undefined,
    }));
    console.log("set value " + value?.toDate());
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    // console.log(task);
    addTask(task).then(() => {
      refreshTasks();
      handleClose();
    });

    // console.log("adding: " + task);
  };
  return (
    // <>
    // <Box
    //   sx={{
    //     width: "300px",
    //     position: "absolute",
    //     top: "30%",
    //     left: "50%",
    //     transform: "translate(-50%, -50%)",
    //   }}
    // >
    <TableRow>
      {open ? (
        <>
          <TableCell></TableCell>
          <TableCell></TableCell>
          {/* <FormControl
          sx={{
              display: "flex",
              flexDirection: "column",
            background: "white",
            p: 2,
            borderRadius: "5px",
          }}
          component="form"
          onSubmit={handleSubmit}
        > */}
          <TableCell sx={{ p: 2 }}>
            <TextField
              size="small"
              label="title"
              name="title"
              required
              onChange={handleInputChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              label="description"
              name="description"
              onChange={handleInputChange}
            />
          </TableCell>
          <TableCell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD-MM-YYYY"
                // value={updatedTask.dueDate ? dayjs(updatedTask.dueDate) : null}
                name="dueDate"
                label="select date"
                onChange={HandleDateChange}
              />
            </LocalizationProvider>
          </TableCell>
          <TableCell>place for priority</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              variant="contained"
            >
              Add
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Button variant="outlined" onClick={handleOpen}>
              Add Task
            </Button>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </>
      )}
    </TableRow>
  );
}

export default CreateTaskForm;
