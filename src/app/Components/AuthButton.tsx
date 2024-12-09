"use client";
import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Přihlášený jako {session.user?.email}</p>
        <Button onClick={() => signOut()}>Odhlásit se</Button>
      </div>
    );
  }
  return <Button onClick={() => signIn()}>Přihlásit se</Button>;
}
