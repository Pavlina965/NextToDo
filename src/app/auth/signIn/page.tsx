import { Container } from "@mui/material";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <LoginForm />
    </Container>
  );
};
export default LoginPage;
