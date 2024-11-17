"use client";
import React, { useState } from "react";
import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import { TaskProps } from "./showTask";
import addTask from "../utils/addTask";
import FetchProjects from "./fetchProjects";
import CreateProjectForm from "./createProject";
interface TaskFormProps {
  refreshTasks: () => void;
}
function CreateTaskForm({ refreshTasks }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskProps>({});
  const projects = FetchProjects();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(task).then(() => {
      refreshTasks();
      handleClose();
    });

    console.log("adding: " + task);
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Task
      </Button>
      <Box
        sx={{
          width: "300px",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal open={open} onClose={handleClose}>
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
              label="title"
              name="title"
              required
              onChange={handleInputChange}
            />
            <TextField
              label="description"
              name="description"
              onChange={handleInputChange}
            />

            {projects.length > 0 ? (
              <TextField label="Select project" select defaultValue={null}>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </TextField>
            ) : (
              <CreateProjectForm />
            )}
            <Button type="submit" variant="contained">
              Add
            </Button>
          </FormControl>
        </Modal>
      </Box>
    </>
  );
}

export default CreateTaskForm;
