import { ProjectProps } from "../components/fetchProjects";
  export default async function addProject(project: ProjectProps) {
    
try {
      const res = await fetch(`/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!res.ok) {
        throw new Error("Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
    console.log(project);
  };