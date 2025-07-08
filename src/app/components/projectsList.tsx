"use client";
import React, { useEffect } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import AddProjectButton from "./addProjectButton";
import { fetchAllProjects } from "../utils/fetchAllProjects";

export interface ProjectProps {
  id: number;
  title?: string;
  desc?: string;
}
interface ProjectsListProps {
  onSelectProject: (
    projectId: number | null,
    isUnassigned?: boolean,
    showToday?: boolean
  ) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ onSelectProject }) => {
  const [openProjectsList, setOpenProjectsList] = React.useState(true);
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);

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

  const handleProjectListOpen = () => {
    setOpenProjectsList(!openProjectsList);
  };

  return (
    <>
      <List sx={{ color: "#E0E6EB " }}>
        <ListItemButton onClick={() => onSelectProject(null, false, true)}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItemButton>
        <ListItemButton onClick={() => onSelectProject(null, true)}>
          <ListItemText primary="Unassigned" />
        </ListItemButton>
        <ListItemButton onClick={() => onSelectProject(null)}>
          <ListItemText primary="All projects" />
        </ListItemButton>
        <ListItemButton onClick={handleProjectListOpen}>
          <ListItemText primary="Projects" />
          {openProjectsList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProjectsList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{}}>
              <ListItemButton
                sx={{
                  background: "#B1D0E0",
                  borderRadius: 5,
                  color: "#36454F",
                  pl: 4,
                  pt: 0,
                  pb: 0,
                  ":hover": { background: "#A1B9C8" },
                }}
              >
                <AddProjectButton refreshProjects={loadProjects} />
              </ListItemButton>
            </ListItem>
            {projects.map((project) => (
              <ListItem key={project.id}>
                <ListItemButton
                  onClick={() => onSelectProject(project.id)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={project.title}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default ProjectsList;
