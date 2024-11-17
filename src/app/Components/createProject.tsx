import { TextField, Button, FormControl } from "@mui/material";
import { ProjectProps } from "./fetchProjects";
import { useState } from "react";

export default function CreateProjectForm() {
  const [project, setProject] = useState<ProjectProps[]>([]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProject(project).then(() => {});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };
  return (
    <FormControl component={"form"} onSubmit={handleSubmit}>
      <TextField
        label="New Project"
        name="newProject"
        onChange={handleInputChange}
      />
      <Button type="submit">create</Button>
    </FormControl>
  );
}
