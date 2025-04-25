import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";

import "./assets/css/App.css";

const TASK_STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to parse tasks from localStorage:", err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    if (!editInput.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: editInput.trim() } : task,
      ),
    );
    setEditId(null);
    setEditInput("");
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <main className="container" aria-label="Todo List Container">
      <h1 id="todo-heading">TODO LIST</h1>
      <TaskInput
        input={input}
        setInput={setInput}
        addTask={addTask}
        ariaLabel="Task input field"
      />
      <ul className="task-list" aria-labelledby="todo-heading">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editId={editId}
            editInput={editInput}
            setEditInput={setEditInput}
            startEditing={startEditing}
            saveEdit={saveEdit}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            ariaLabel={`Task: ${task.text}`}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
