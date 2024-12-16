/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
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
  useMediaQuery,
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
import { useSession } from "next-auth/react";
import NotLoginPrompt from "./NotLogin";
import { todo } from "node:test";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface TodoProps {
  todo: TaskProps;
  onDelete: (todoId: number | undefined) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  isMobile: boolean;
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

  // const [editTask, setEditTask] = useState<TaskProps | null>(null);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const isMobile = useMediaQuery("(max-width: 600px)");

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
      {!session ? (
        <NotLoginPrompt />
      ) : (
        <Box sx={{ boxShadow: 3 }}>
          <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {/* <TableCell>id</TableCell> */}
                  <TableCell>Task name</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Due date
                  </TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Priority
                  </TableCell>
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
                    isMobile={isMobile}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};
const Task = ({ todo, onDelete, setTasks, isMobile }: TodoProps) => {
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
      {/* <TableCell>{todo.id}</TableCell> */}
      <TableCell sx={{ minWidth: "150px" }}>{todo.title}</TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {todo.description}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {todo.dueDate
          ? dayjs(todo.dueDate).local().format("DD/MM/YYYY")
          : "No due date"}
      </TableCell>
      {/* <TableCell>{todo.done ? "Done" : "Not done"}</TableCell> */}
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        Priority will be there
      </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            handleOpenModal();
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
