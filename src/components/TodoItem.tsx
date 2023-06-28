import React, { useState } from "react";
import { Todo } from "../types";
import { useAtom } from 'jotai';
import { completeTodoAtom, editTodoAtom } from '../atoms';
import { Close } from "./icons/Close";

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo }) => {
  const [, completeTodo] = useAtom(completeTodoAtom);
  const [, editTodo] = useAtom(editTodoAtom);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleComplete = (todo: Todo) => {
    completeTodo(todo);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (todoId: Todo['id'], editedTitle: Todo['title']) => {
    editTodo({ title: editedTitle, id: todoId});
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <li className="flex justify-between items-center bg-slate-100 rounded-md px-2 py-1 my-1.5 hover:bg-slate-200 cursor-pointer w-full" onClick={handleEdit}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => handleComplete(todo)} 
          className="mr-2"
        />
       {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleChange}
            onBlur={() => handleSave(todo.id, editedTitle)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave(todo.id, editedTitle);
              } else if (event.key === "Escape") {
                handleCancel();
              }
            }}
            autoFocus
            className="outline-none bg-transparent text-lg"
          />
        ) : (
          <p 
            className="text-gray-800 text-lg"
          >
            {todo.title}
          </p>
          )}
      </div>
      <Close
        className="fill-red-600 ml-2 delete"
        onClick={() => deleteTodo(todo.id)}
      />
    </li>
  );
};