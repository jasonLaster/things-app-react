import React from "react";
import { Todo } from "../types";
import { useAtom } from 'jotai';
import { completeTodoAtom } from '../atoms';
import { Close } from "./icons/Close";

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo }) => {
  const [, completeTodo] = useAtom(completeTodoAtom);

  const handleComplete = (todo: Todo) => {
    completeTodo(todo);
  };
  return (
    <li className="flex justify-between items-center bg-slate-100 rounded-md p-3">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => handleComplete(todo)} 
          className="mr-2"
        />
        <p className="text-gray-800 text-lg">{todo.title}</p>
      </div>
      <Close
        className="fill-red-600 ml-2 delete"
        onClick={() => deleteTodo(todo.id)}
      />
    </li>
  );
};
