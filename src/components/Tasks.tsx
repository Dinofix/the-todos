import { useEffect, useState } from "react";
import { ToDo } from "../models/ToDo";

export const Tasks = () => {
  const [tasks, setTasks] = useState<ToDo[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      const defaultTasks: ToDo[] = [
        { id: 1, task: "Bygga raketer", isDone: false },
        { id: 2, task: "Fightas med mumier", isDone: false },
        { id: 3, task: "Stå i eiffeltornet och rapa", isDone: false },
        { id: 4, task: "Upptäcka något som aldrig funnits", isDone: false },
        { id: 5, task: "Tvätta och bada en apa", isDone: false },
      ];
      setTasks(defaultTasks);
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const deleteTask = (value: string) => {
    setTasks((prev) => prev!.filter((task) => task.task !== value));
  };

  const doneTask = (value: string) => {
    setTasks((prev) =>
      prev!.map((task) =>
        task.task === value ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  if (!tasks) return <p>Laddar todo-listan...</p>;

  return (
    <div>
      <h1>Summer ToDo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.isDone ? "completed" : ""}>
            <input type="checkbox" checked={task.isDone} disabled />
            <h3>{task.task}</h3>
            <p>
              <button onClick={() => doneTask(task.task)}>Done</button>
              <button onClick={() => deleteTask(task.task)}>Delete</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
