import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  editId,
  editInput,
  setEditInput,
  startEditing,
  saveEdit,
  toggleDone,
  deleteTask,
}) => (
  <ul className="task-list" aria-label="List of tasks">
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
      />
    ))}
  </ul>
);

export default TaskList;
