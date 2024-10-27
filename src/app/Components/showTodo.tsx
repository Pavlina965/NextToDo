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
import TodoForm from "./addTodo";

export interface TodoProps {
  todo: TaskProps;
  onEdit: (editTodo: TaskProps) => void;
  onDelete: (todoId: number) => void;
}
export interface TaskProps {
  title: string;
  done: boolean;
  id: number;
  dueDate: Date;
}

const ShowTodo: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function HandleEditTask(editTodo: TaskProps) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editTodo.id ? editTodo : task))
    );
    // TODO: Implement an API call here to update the task on the backend
  }
  function HandleDeleteTask(todoId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== todoId));
    // TODO: Implement an API call here to delete the task on the backend
  }

  return (
    <>
      <div>
        <TodoForm refreshTasks={fetchTasks} />
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
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ todo });

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = event.target;
    setEditFormData((prev) => ({ ...prev, [title]: value }));
  };
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <Input
          value={todo.title}
          onChange={(e) => {
            onEdit({ ...todo, title: e.target.value });
          }}
        />
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </>
    );
  } else {
    todoContent = (
      <>
        <ListItemText
          primary={todo.title}
          sx={{ textDecoration: todo.done ? "line-through" : "none" }}
        />
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </>
    );
  }
  return (
    <ListItem>
      <Checkbox
        checked={todo.done}
        onChange={(e) => {
          onEdit({
            ...todo,
            done: e.target.checked,
          });
          {
          }
        }}
      />
      {todoContent}
      <Button onClick={() => onDelete(todo.id)}>Delete</Button>
    </ListItem>
  );
};
export default ShowTodo;
