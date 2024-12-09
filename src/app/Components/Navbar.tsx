"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <AppBar position="static" sx={{ bgcolor: "#2B4C6F " }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TodoList
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/about">
            About
          </Button>
          <Button color="inherit" href="/contact">
            Contact
          </Button>

          {session ? (
            <>
              <p>Přihlášený jako {session.user?.email}</p>
              <Button color="inherit" onClick={() => signOut()}>
                Odhlásit se
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>
              Přihlásit se
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
