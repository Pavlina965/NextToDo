"use client";
import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { ProjectProps } from "./fetchProjects";
import addProject from "../utils/addProject";

interface ProjectFormProps {
  refreshProjects: () => void;
}

function AddProjectForm({ refreshProjects }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<ProjectProps>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    addProject(project).then(() => {
      refreshProjects();
      handleClose();
    });
  };
  return (
    <FormControl component={"form"} onSubmit={handleSubmit}>
      {open ? (
        <>
          <TextField
            size="small"
            label="title"
            name="title"
            onChange={handleInputChange}
          />
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
          >
            Add
          </Button>
        </>
      ) : (
        <>
          <Button variant="outlined" onClick={handleOpen}>
            Add Project
          </Button>
        </>
      )}
    </FormControl>
  );
}

export default AddProjectForm;
