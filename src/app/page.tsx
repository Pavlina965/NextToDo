import { Container } from "@mui/material";
import AddTodo from "./Components/addTodo";
import ShowTodo from "./Components/showTodo";

export default async function Home() {
  // return <Test />;
  // const [todos, setTodos] = useState<TodoProps[]>([]);
  // const HandleAddTask = (task: string) => {
  //   setTodos([...todos, { task: task, done: false, id: uuidv4() }]);
  // };
  return (
    <Container>
      <h1>Todolist</h1>
      <AddTodo />
      <ShowTodo
      // tasks={allTasks}
      // onEditTask={HandleEditTask}
      // onDeleteTask={HandleDeleteTask}
      />
    </Container>
  );
}
