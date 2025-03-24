import { useEffect, useState } from "react";
import { ToDo } from "../models/ToDo";

export const Tasks = () => {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [
    new ToDo(1, "Bygga raketer", false),
    new ToDo(2, "Fightas med mumier", false),
    new ToDo(3, "Stå i eiffeltornet och rapa", false),
    new ToDo(4, "Upptäcka något som aldrig funnits", false),
    new ToDo(5, "Tvätta och bada en apa", false),
  ];

  const [tasks, setTasks] = useState<ToDo[]>(initialTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (value: string) => {
    setTasks(tasks.filter((task) => task.task !== value));
  };

  const doneTask = (value: string) => {
    const updatedTasks = tasks.map((task) =>
      task.task === value ? { ...task, isDone: !task.isDone } : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Summer ToDo List</h1>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id} className={task.isDone ? "completed" : ""}>
              <input type="checkbox" checked={task.isDone} disabled />
              <h3>{task.task}</h3>
              <p>
                <button
                  onClick={() => {
                    doneTask(task.task);
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.task);
                  }}
                >
                  Delete
                </button>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
