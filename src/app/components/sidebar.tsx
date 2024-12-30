"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ExpandLess } from "@mui/icons-material";

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import ProjectsList from "./projectsList";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const drawerWidth = 260;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [openDrawer, setOpenDrawer] = React.useState(isMobile ? false : true);
  const [openUserMenu, setOpenUserMenu] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };
  const { data: session } = useSession();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!isMobile ? (
        <Drawer
          variant="persistent"
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "#3A6691",
              color: "white",
              boxSizing: "border-box",
              padding: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              TodoList
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <ProjectsList />

          {/* </Box> */}
        </Drawer>
      ) : (
        <SwipeableDrawer
          anchor="top"
          open={openDrawer}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              height: "60%",
              bgcolor: "#3A6691",
              color: "white",
              padding: 2,
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleDrawerToggle}>
              <ExpandLess sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <ProjectsList />
        </SwipeableDrawer>
      )}

      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          marginLeft: openDrawer || isMobile ? 0 : `-${drawerWidth}px`,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "#2B4C6F",
            width:
              openDrawer && !isMobile
                ? `calc(100% - ${drawerWidth}px)`
                : "100%",
            transition: "width 0.3s ease",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {!openDrawer && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
              <Button color="inherit" href="/">
                Home
              </Button>
              {session ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={session.user?.email}>
                    <IconButton onClick={handleUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={openUserMenu}
                    onClose={handleUserMenu}
                  >
                    <MenuItem onClick={handleUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {session.user?.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>Odhlásit se</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button color="inherit" onClick={() => signIn()}>
                  Přihlásit se
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component={"main"} sx={{ mt: 8, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
