/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/material";
import ShowTodo from "./Components/showTodo";
import TodoForm from "./Components/addTodo";
const Home = () => {
  return (
    <Container>
      <h1>Todolist</h1>
      {/* <TodoForm /> */}
      <ShowTodo
      // tasks={tasks}
      // onEditTask={HandleEditTask}
      // onDeleteTask={HandleDeleteTask}
      />
    </Container>
  );
};
export default Home;
