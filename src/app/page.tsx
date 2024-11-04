/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/material";
import ShowTaks from "./Components/showTask";
import AddTaskForm from "./Components/addTaks";
import Loading from "./Components/loading";
import { Suspense } from "react";
const Home = () => {
  return (
    <Container>
      <h1>Todolist</h1>
      <Suspense fallback={<Loading />}>
        <ShowTaks />
      </Suspense>
    </Container>
  );
};
export default Home;
