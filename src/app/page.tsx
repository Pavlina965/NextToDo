/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import ShowTask from "./components/showTask";
import Sidebar from "./components/sidebar";
import AuthGuard from "./components/authGuard";

const Home = () => {
  return (
    <AuthGuard>
      <ShowTask />
    </AuthGuard>
  );
};
export default Home;
