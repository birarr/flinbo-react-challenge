import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchData } from "../../api";
import { TodoItem } from "../todo-item";
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeToggle from "../toggle-button";
import { FilterTodos } from "../../@types/enums";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useTheme } from "../../context/ThemeContext";
import { Modal } from "../modal";

const options = [
  FilterTodos.all,
  FilterTodos.completed,
  FilterTodos.notCompleted,
];

export const TodoPage = () => {
  const { theme } = useTheme();
  const [todos, setTodos] = useLocalStorage<Task[] | undefined>(
    "todosList",
    undefined,
  );

  const [filter, setFilter] = useState<string>(FilterTodos.all);

  const todoItemsCompleted = useMemo(
    () => todos?.filter((todo) => todo.completed === true),
    [todos],
  );

  const todoItemsNotCompleted = useMemo(
    () => todos?.filter((todo) => todo.completed === false),
    [todos],
  );

  const todosFiltered = useMemo(() => {
    if (filter === FilterTodos.completed) {
      return todoItemsCompleted;
    } else if (filter === FilterTodos.notCompleted) {
      return todoItemsNotCompleted;
    } else {
      return todos;
    }
  }, [filter, todoItemsCompleted, todoItemsNotCompleted, todos]);

  const fetchTodos = useCallback(async () => {
    const todosItems = await fetchData();

    setTodos(todosItems);
  }, [setTodos]);

  useEffect(() => {
    if (!todos) {
      fetchTodos();
    }
  }, []);

  const toggleCompleted = (id: number) => {
    const todosUpdated = todos?.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(todosUpdated);
  };

  const deleteTask = (id: number) => {
    const tasksNotDeleted = todos?.filter((task) => task.id !== id);

    setTodos(tasksNotDeleted);
  };

  const resetCache = () => {
    localStorage.removeItem("todosList");
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-24">
      <div className="w-full flex justify-end">
        <ThemeToggle />
      </div>
      {todosFiltered?.length === 0 && (
        <h1 className="text-white">There's no todos. Click reset cache</h1>
      )}

      <Modal />

      <div className="flex flex-col gap-4">
        {todos && todos.length > 0 && (
          <div className="flex flex-col gap-2">
            <label
              className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Filter by status:
            </label>
            <Dropdown
              options={options}
              onChange={(e) => setFilter(e.value)}
              className="myClassName"
              controlClassName="p-2 mb-2"
              baseClassName={`${
                theme === "dark"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-300 text-gray-900"
              } rounded-xl p-4`}
              menuClassName="mb-2"
            />
          </div>
        )}

        {todosFiltered?.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              task={todo}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          );
        })}
      </div>

      <button
        className={`p-2 rounded-md transition ${
          theme === "dark"
            ? "bg-purple-600 text-white"
            : "bg-purple-300 text-gray-900"
        } rounded-xl`}
        onClick={resetCache}
      >
        Reset cache
      </button>
    </div>
  );
};
