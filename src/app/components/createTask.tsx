"use client";
import React, { useState } from "react";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import addTask from "../utils/addTask";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
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
      dueDate: value ? dayjs(value).utc().toDate() : undefined,
    }));
  };

  const handleSubmit = async () => {
    addTask(task).then(() => {
      refreshTasks();
      handleClose();
    });
  };
  return (
    <TableRow>
      {open ? (
        <>
          <TableCell></TableCell>
          <TableCell></TableCell>

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
