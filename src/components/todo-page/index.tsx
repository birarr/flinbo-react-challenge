import { useCallback, useEffect } from "react";
import { fetchData } from "../../api";
import { TodoItem } from "../todo-tem";
import { useLocalStorage } from "@uidotdev/usehooks";

export const TodoPage = () => {
  const [todos, setTodos] = useLocalStorage<Task[] | undefined>(
    "todosList",
    undefined
  );

  const fetchTodos = useCallback(async () => {
    const todosItems = await fetchData();

    setTodos(todosItems);
  }, []);

  useEffect(() => {
    if (!todos) {
      fetchTodos();
    }
  }, []);

  function toggleCompleted(id: number) {
    const todosUpdated = todos?.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(todosUpdated);
  }

  function deleteTask(id: number) {
    console.log("hahaha");
    const tasksNotDeleted = todos?.filter((task) => task.id !== id);

    setTodos(tasksNotDeleted);
  }

  return (
    <div>
      {todos?.map((todo) => {
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
  );
};
