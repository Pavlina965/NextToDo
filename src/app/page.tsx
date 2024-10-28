/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/material";
import ShowTaks from "./Components/showTask";
import AddTaskForm from "./Components/addTaks";
const Home = () => {
  return (
    <Container>
      <h1>Todolist</h1>
      <ShowTaks />
    </Container>
  );
};
export default Home;
