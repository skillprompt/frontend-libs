import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (text) =>
          set(
            (state) => ({
              todos: [
                ...state.todos,
                { id: Date.now(), text, completed: false },
              ],
            }),
            false,
            "addTodo" // action name for devtools
          ),
        toggleTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              ),
            }),
            false,
            "toggleTodo"
          ),
        removeTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.filter((todo) => todo.id !== id),
            }),
            false,
            "removeTodo"
          ),
      }),
      {
        name: "todo-storage",
      }
    )
  )
);
