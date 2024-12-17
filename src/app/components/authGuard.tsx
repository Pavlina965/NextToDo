"use client";

import { useSession } from "next-auth/react";
import { CircularProgress, Box } from "@mui/material";

import NotLoginPrompt from "./NotLogin";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  //   const router = useRouter();

  if (status === "unauthenticated") {
    return <NotLoginPrompt />;
    //   router.push("/login");
  }

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
}
