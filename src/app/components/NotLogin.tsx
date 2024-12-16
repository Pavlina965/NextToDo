import { Container, Typography, Stack, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const NotLoginPrompt = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Vítejte v aplikaci!
      </Typography>
      <Typography variant="h6">
        Přihlaste se nebo si vytvořte účet a začněte spravovat své úkoly.
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Přihlásit se
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/auth/register")}
        >
          Registrovat se
        </Button>
      </Stack>
    </Container>
  );
};
export default NotLoginPrompt;
