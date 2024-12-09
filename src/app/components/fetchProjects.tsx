import { fetchAllProjects } from "../utils/fetchAllProjects";
import { useEffect, useState } from "react";
export interface ProjectProps {
  id?: number;
  title?: string;
  desc?: string;
}
export default function ShowProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const loadProjects = async () => {
    try {
      const data = await fetchAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };
  useEffect(() => {
    loadProjects();
  }, []);
  return projects;
}
