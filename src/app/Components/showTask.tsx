/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import AddTaskForm from "./addTaks";
import { on } from "events";

export interface TodoProps {
  todo: TaskProps;
  onEdit: (editTodo: TaskProps, data: TaskProps) => void;
  onDelete: (todoId: number) => void;
}
export interface TaskProps {
  title: string;
  done: boolean | undefined;
  id: number;
  dueDate: Date | undefined;
}

const ShowTaks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
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

  async function HandleEditTask(task: TaskProps, data: TaskProps | null) {
    try {
      const res = await fetch(`/api/tasks?id=${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: task.id,
          ...data,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }
      const updatedData = await res.json();
      console.log(updatedData);
    } catch (error) {
      console.error(error);
    }
    fetchTasks();
    // TODO: Implement an API call here to update the task on the backend
  }
  async function HandleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    console.log("Deleting task with ID:", taskId);
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
          />
        ))}
      </List>
    </>
  );
};
const Task = ({ todo, onEdit, onDelete }: TodoProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(todo, { ...todo, done: true });
  };
  return (
    <ListItem>
      <Checkbox checked={todo.done} onChange={handleCheckboxChange} />
      <ListItemText
        primary={todo.title}
        sx={{ textDecoration: todo.done ? "line-through" : "none" }}
      />
      <Button onClick={() => onEdit(todo, { ...todo })}>Edit</Button>
      <Button onClick={() => onDelete(todo.id)}>Delete</Button>
    </ListItem>
  );
};
export default ShowTaks;
