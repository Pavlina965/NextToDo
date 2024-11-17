/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/material";
import ShowTaks from "./Components/showTask";
import CreateTaskForm from "./Components/createTask";
import Loading from "./loading";
import { Suspense } from "react";
import Sidebar from "./Components/sidebar";
const Home = () => {
  return (
    <Container>
      <h1>Todolist</h1>
      <Sidebar />
      <ShowTaks />
    </Container>
  );
};
export default Home;
