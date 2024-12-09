// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     router.push("/auth/signIn");
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Heslo"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Registrovat se</button>
//     </form>
//   );
// }
import React from "react";
import RegisterForm from "./registerForm";
import { Container } from "@mui/material";

export default function Register() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
      }}
    >
      <RegisterForm />
    </Container>
  );
}
