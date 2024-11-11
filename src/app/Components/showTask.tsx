/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import CreateTaskForm from "./createTask";
import EditTaskForm from "./editTask";
import { fetchTasks } from "../utils/fetchTasks";
import { deleteTask } from "../utils/deleteTask";
import updateTask from "../utils/updateTask";

export interface TodoProps {
  todo: TaskProps;
  onDelete: (todoId: number | undefined) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
export interface TaskProps {
  title?: string;
  description?: string;
  done?: boolean;
  id?: number;
  dueDate?: Date;
}

const ShowTaks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [editTask, setEditTask] = useState<TaskProps | null>(null);

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
      <div>
        <CreateTaskForm refreshTasks={() => loadTasks()} />
      </div>

      <List>
        {tasks.map((task) => (
          <Task
            key={task.id}
            todo={task}
            onDelete={HandleDeleteTask}
            setTasks={setTasks}
          />
        ))}
      </List>
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
    // setTasks((prevTasks: TaskProps[]) =>
    //   prevTasks.map((task: TaskProps) =>
    //     task.id === todo.id ? updatedTask : task
    //   )
    // );
    updateTask(updatedTask).then(() => {
      refreshTasks();
    });
  };

  return (
    <ListItem>
      <Checkbox checked={todo.done} onChange={handleCheckboxChange} />
      <ListItemText
        primary={todo.title}
        sx={{ textDecoration: todo.done ? "line-through" : "none" }}
      />
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
    </ListItem>
  );
};
export default ShowTaks;
