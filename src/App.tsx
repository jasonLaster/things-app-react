import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";
import { Inbox } from "./components/icons/Inbox";
import { useAtom } from "jotai";
import { todosAtom, deleteTodoAtom, fetchTodosAtom } from "./atoms";
import { useEffect } from "react";

export const App = () => {
  const [, fetchTodos] = useAtom(fetchTodosAtom);
  useEffect(() => {
    fetchTodos();
  }, []);
  const [todos] = useAtom(todosAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);

  return (
    <section className="h-screen w-screen bg-slate-800 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-xl overflow-hidden shadow-lg px-5 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            <Inbox className="fill-blue-500 inline-block mb-1 mr-2" />
            Inbox
          </h1>
        </header>
        <div className="border-b border-gray-200 mb-6">
          <AddTodo />
        </div>
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </section>
  );
};
