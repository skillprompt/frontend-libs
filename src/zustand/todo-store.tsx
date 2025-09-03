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
  // TODO
  // updatetodo
  // markTodoAsComplete
};

export const todoStore = create<TTodoStore>()(
  persist<TTodoStore>(
    (set) => {
      return {
        todos: [],
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
      };
    },
    {
      name: "my-todos",
    }
  )
);
