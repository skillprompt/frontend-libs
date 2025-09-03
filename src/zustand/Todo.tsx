import { useState } from "react";
import { todoStore } from "./todo-store";

export function Todo() {
  const [title, setTitle] = useState("");

  const myTodoStore = todoStore();

  const handleAddTodo = () => {
    myTodoStore.addTodo(title);
  };

  const handleDeleteTodo = (id: number) => {
    myTodoStore.deleteTodo(id);
  };

  return (
    <div>
      {/* todo input field */}
      {/* button to add that todo */}
      {/* show the added todo item in a list */}
      {/* checkbox in each item to mark it as completed */}
      {/* edit button in each item to edit a todo item */}
      {/* delete button in each item to delete a todo item */}

      <div>
        <h1>Todo List</h1>

        {/* Input + Add button */}
        <form>
          <input
            type="text"
            placeholder="Add a new task…"
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
          />
          <button type="button" onClick={handleAddTodo}>
            Add
          </button>
        </form>

        {/* Todo items list (static examples) */}
        <ul>
          {myTodoStore.todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.isCompleted} />
                  {todo.title}
                </label>
                <button>Edit</button>
                <button
                  type="button"
                  onClick={(event) => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>

        {/* Empty state */}
        <div>Your todos will appear here.</div>
      </div>
    </div>
  );
}
