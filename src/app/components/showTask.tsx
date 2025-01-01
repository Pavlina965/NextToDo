/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
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
import CreateTaskForm from "./createTaskForm";
import EditTaskForm from "./editTask";
import { fetchTasks } from "../utils/fetchTasks";
import { deleteTask } from "../utils/deleteTask";
import updateTask from "../utils/updateTask";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useSession } from "next-auth/react";

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

const ShowTask: React.FC<{ projectId?: number | undefined }> = ({
  projectId,
}) => {
  const { data: session } = useSession();

  // const [editTask, setEditTask] = useState<TaskProps | null>(null);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const loadTasks = async () => {
    try {
      if (projectId) {
        console.log(projectId);
        // const data = await fetchTasks(projectId);
        // setTasks(data);
      }
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
  }
  return (
    <>
      {session &&
        (!isMobile ? (
          <Box sx={{ boxShadow: 3 }}>
            <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {/* <TableCell>id</TableCell> */}
                    <TableCell>Task name</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      Due date
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      Priority
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <CreateTaskForm refreshTasks={() => loadTasks()} />
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
        ) : (
          <Box sx={{ padding: 0, margin: 0 }}>
            <CreateTaskForm refreshTasks={loadTasks} />
            <Stack spacing={2}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  todo={task}
                  onDelete={HandleDeleteTask}
                  setTasks={setTasks}
                  isMobile={isMobile}
                />
              ))}
            </Stack>
          </Box>
        ))}
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

  return !isMobile ? (
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
  ) : (
    <Card
      sx={{
        backgroundColor: todo.done ? "#C3E6CB" : "white",
        boxShadow: 3,
        borderRadius: 2,
        width: "100%",
        marginX: "0",
        padding: 1,
        boxSizing: "border-box",
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Checkbox
            checked={todo.done}
            onChange={(e) => handleCheckboxChange(e, e.target.checked)}
          />
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
              {todo.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ wordWrap: "break-word" }}
            >
              {todo.description || "No description"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              {todo.dueDate
                ? `Due: ${dayjs(todo.dueDate).format("DD/MM/YYYY")}`
                : "No due date"}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          onClick={() => setIsEditing(true)}
          variant="contained"
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(todo.id)}
          variant="contained"
        >
          Delete
        </Button>
      </CardActions>
      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <EditTaskForm
          task={todo}
          onClose={() => setIsEditing(false)}
          refreshTasks={refreshTasks}
        />
      </Modal>
    </Card>
  );
};
export default ShowTask;
