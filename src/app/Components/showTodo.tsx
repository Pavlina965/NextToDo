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

interface TodoProps {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };
    fetchTasks();
  }, []);
  function HandleEditTask(editTodo: TaskProps) {
    tasks.map((t) => {
      if (t.id === editTodo.id) {
        return editTodo;
      } else {
        return t;
      }
    });
  }
  function HandleDeleteTask(todoId: number) {
    tasks.filter((t) => t.id !== todoId);
  }

  return (
    <List>
      {tasks.map((task, id) => (
        <Task
          key={id}
          todo={task}
          onEdit={HandleEditTask}
          onDelete={HandleDeleteTask}
        />
      ))}
    </List>
  );
};
const Task = ({ todo, onEdit, onDelete }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  console.log(todo);
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
