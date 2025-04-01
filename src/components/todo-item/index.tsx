import { CheckSquare2, Trash2Icon, XSquare } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

type TodoItemProps = {
  task: Task;
  toggleCompleted: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
};

export const TodoItem = ({
  task,
  deleteTask,
  toggleCompleted,
}: TodoItemProps) => {
  function handleChange() {
    toggleCompleted(task.id);
  }

  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-purple-600" : "bg-purple-300"
      } flex justify-between items-center p-4 rounded-xl`}
    >
      <div className="flex items-center gap-4">
        <p
          className={`${task.completed ? "line-through" : ""} ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } font-bol`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex gap-2">
        {!task?.completed ? (
          <CheckSquare2
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900"
            } shrink-0`}
            onClick={handleChange}
          />
        ) : (
          <XSquare
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900"
            } shrink-0`}
            onClick={handleChange}
          />
        )}
        <Trash2Icon
          className={`${
            theme === "dark" ? "text-white" : "text-gray-900"
          } shrink-0`}
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
};
