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

  return (
    <div className="todo-item">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />
      <p>{task.title}</p>
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
};
