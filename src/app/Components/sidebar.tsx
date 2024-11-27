"use client";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FetchProjects from "./fetchProjects";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TodayIcon from "@mui/icons-material/Today";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export default function Sidebar() {
  const projects = FetchProjects();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 260,
        bgcolor: "#3A6691",
        color: "white",
        padding: 2,
        height: "100vh",
      }}
    >
      <h1>Menu</h1>
      <List sx={{ color: "#E0E6EB " }}>
        <ListItemButton>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Projects" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
                <ListItemText primary="Add Project"></ListItemText>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
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
    </Box>
  );
}
