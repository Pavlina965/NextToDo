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
  id?: number;
  title?: string;
  desc?: string;
}
const ProjectsList = () => {
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

  const handleClick = () => {
    setOpenProjectsList(!openProjectsList);
  };
  return (
    <List sx={{ color: "#E0E6EB " }}>
      <ListItemButton>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
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
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={project.title}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default ProjectsList;
