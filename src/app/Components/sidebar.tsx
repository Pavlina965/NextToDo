"use client";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import FetchProjects from "./fetchProjects";

export default function Sidebar() {
  const projects = FetchProjects();
  return (
    <Box>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <ListItemButton>{project.title}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
