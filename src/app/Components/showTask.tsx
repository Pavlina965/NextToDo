/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import AddTaskForm from "./addTaks";
import EditTaskForm from "./editTask";
import { todo } from "node:test";
import { on } from "events";
// import { Task } from "@prisma/client";

export interface TodoProps {
  todo: TaskProps;
  onEdit: (todo: TaskProps, data: TaskProps) => void;
  onDelete: (todoId: number) => void;
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
  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function HandleEditTask(task: TaskProps, data: TaskProps) {
    setEditTask(tasks.find((t) => t.id === task.id) ?? null);
  }
  async function HandleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // console.log("Deleting task with ID:", taskId);
    try {
      const res = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
      fetchTasks();
    }
  }
  return (
    <>
      <div>
        <AddTaskForm refreshTasks={fetchTasks} />
      </div>
      <List>
        {tasks.map((task) => (
          <Task
            key={task.id}
            todo={task}
            onEdit={HandleEditTask}
            onDelete={HandleDeleteTask}
            setTasks={setTasks}
          />
        ))}
      </List>
    </>
  );
};
const Task = ({ todo, onEdit, onDelete, setTasks }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleOpen = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const updatedTask = { ...todo, done: checked };
    setTasks((prevTasks: TaskProps[]) =>
      prevTasks.map((task) => (task.id === todo.id ? updatedTask : task))
    );
    // onEdit(todo, updatedTask);
    try {
      const res = await fetch(`/api/tasks?id=${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    console.log(updatedTask);
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
          // console.log(todo);
          handleOpen();
          // EditTaskForm(todo);
        }}
      >
        Edit
      </Button>
      {isEditing && (
        <Modal open={isEditing} onClose={handleClose}>
          <EditTaskForm task={todo} />
        </Modal>
      )}
      {/* onEdit(todo, { ...todo })}>Edit</Button> */}
      <Button onClick={() => onDelete(todo.id)}>Delete</Button>
    </ListItem>
  );
};
export default ShowTaks;
