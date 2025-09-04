import { create } from "zustand";
import { persist } from "zustand/middleware";

type TTodo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type TTodoStore = {
  todos: TTodo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  // markTodoAsComplete
};

export const todoStore = create<TTodoStore>()(
  persist<TTodoStore>(
    (set) => {
      return {
        todos: [
          {
            id: 1,
            title: "one new title",
            isCompleted: false,
          },
        ],
        addTodo: (title) => {
          set((state) => {
            const newId = state.todos.length + 1;
            return {
              todos: [
                ...state.todos,
                {
                  id: newId,
                  title,
                  isCompleted: false,
                },
              ],
            };
          });
        },
        deleteTodo: (id) => {
          set((state) => {
            return {
              todos: state.todos.filter((todo) => {
                return todo.id !== id;
              }),
            };
          });
        },
        updateTodo: (id, title) => {
          set((state) => {
            return {
              todos: state.todos.map((todo) => {
                if (todo.id === id) {
                  return {
                    id: todo.id,
                    title: title,
                    isCompleted: todo.isCompleted,
                  };
                } else {
                  return todo;
                }
              }),
            };
          });
        },
      };
    },
    {
      name: "my-todos",
    }
  )
);
