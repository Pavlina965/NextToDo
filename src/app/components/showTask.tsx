/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import CreateTaskForm from "./createTask";
import EditTaskForm from "./editTask";
import { fetchTasks } from "../utils/fetchTasks";
import { deleteTask } from "../utils/deleteTask";
import updateTask from "../utils/updateTask";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface TodoProps {
  todo: TaskProps;
  onDelete: (todoId: number | undefined) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
export interface TaskProps {
  // localDate: string;
  title?: string;
  description?: string;
  done?: boolean;
  id?: number;
  dueDate?: Date;
}

const ShowTask: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // const [editTask, setEditTask] = useState<TaskProps | null>(null);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  async function HandleDeleteTask(taskId: number | undefined) {
    if (taskId !== undefined) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      deleteTask(taskId);
    } else {
      console.error("Task ID is undefined");
    }
    // await refetchTasks();
  }
  return (
    <>
      {session ? (
        <Box sx={{ boxShadow: 3 }}>
          <p></p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>id</TableCell>
                  <TableCell>Task name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due date</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell>Priority</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CreateTaskForm refreshTasks={() => loadTasks()} />
                {/* <TaskList tasks={tasks} setTasks={setTasks} /> */}
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    todo={task}
                    onDelete={HandleDeleteTask}
                    setTasks={setTasks}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h3" gutterBottom>
            Vítejte v aplikaci!
          </Typography>
          <Typography variant="h6" paragraph>
            Přihlaste se nebo si vytvořte účet a začněte spravovat své úkoly.
          </Typography>

          <Stack spacing={2} direction="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => signIn()}
            >
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
      )}
    </>
  );
};
const Task = ({ todo, onDelete, setTasks }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleOpenModal = () => setIsEditing(true);
  const handleCloseModal = () => {
    setIsEditing(false);
  };
  const refreshTasks = async () => {
    const updatedTasks = await fetchTasks();

    setTasks(updatedTasks);
  };
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const updatedTask = { ...todo, done: checked };

    updateTask(updatedTask).then(() => {
      refreshTasks();
    });
  };

  return (
    <TableRow sx={{ background: todo.done ? "#C3E6CB" : "none" }}>
      <TableCell>
        <Checkbox checked={todo.done} onChange={handleCheckboxChange} />
      </TableCell>
      <TableCell>{todo.id}</TableCell>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>
        {todo.dueDate
          ? dayjs(todo.dueDate).local().format("DD/MM/YYYY")
          : "No due date"}
      </TableCell>
      {/* <TableCell>{todo.done ? "Done" : "Not done"}</TableCell> */}
      <TableCell>Priority will be there</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            handleOpenModal();
            // console.log(todo);
          }}
        >
          Edit
        </Button>
        <Modal open={isEditing} onClose={handleCloseModal}>
          <EditTaskForm
            task={todo}
            onClose={handleCloseModal}
            refreshTasks={refreshTasks}
          />
        </Modal>
        <Button onClick={() => onDelete(todo.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
export default ShowTask;
