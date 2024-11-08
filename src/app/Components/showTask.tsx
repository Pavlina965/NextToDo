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
import { useEffect, useState } from "react";
import React from "react";
import AddTaskForm from "./addTaks";
import EditTaskForm from "./editTask";
import { fetchTasks } from "../utils/fetchTasks";
import { deleteTask } from "../utils/deleteTask";
import updateTask from "../utils/updateTask";
import { set } from "react-hook-form";

export interface TodoProps {
  todo: TaskProps;
  onDelete: (todoId: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
export interface TaskProps {
  title: string;
  description: string | undefined;
  done: boolean;
  id: number;
  dueDate: Date | undefined;
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

  const refetchTasks = async () => {
    await fetchTasks().then((updatedTasks) => {
      setTasks(updatedTasks);
      console.log(updatedTasks);
    });
  };

  async function HandleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    deleteTask(taskId);
    // await refetchTasks();
  }
  return (
    <>
      <div>
        <AddTaskForm refreshTasks={() => loadTasks()} />
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
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const updatedTask = { ...todo, done: checked };
    setTasks((prevTasks: TaskProps[]) =>
      prevTasks.map((task: TaskProps) =>
        task.id === todo.id ? updatedTask : task
      )
    );
    updateTask(updatedTask);
    refreshTasks();
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
          loadTasks={refreshTasks}
        />
      </Modal>

      {/* onEdit(todo, { ...todo })}>Edit</Button> */}
      <Button onClick={() => onDelete(todo.id)}>Delete</Button>
    </ListItem>
  );
};
export default ShowTaks;
