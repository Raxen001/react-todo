import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUndo,
  faEdit,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function TaskItem({
  task,
  editId,
  editInput,
  setEditInput,
  startEditing,
  saveEdit,
  toggleDone,
  deleteTask,
}) {
  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit(task.id);
    }
  };

  const isEditing = editId === task.id;

  return (
    <li
      className={`task-item${isEditing ? " edit" : ""}`}
      aria-label={`Task item: ${task.text}`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={handleEditKeyDown}
            aria-label="Edit task input"
          />
          <button
            className="done-btn btn"
            onClick={() => saveEdit(task.id)}
            aria-label="Save edited task"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </>
      ) : (
        <>
          <span className={`content ${task.done ? "done" : ""}`}>
            {task.text}
          </span>
          <button
            className="done-btn btn"
            onClick={() => toggleDone(task.id)}
            aria-label={
              task.done ? "Mark task as not done" : "Mark task as done"
            }
          >
            <FontAwesomeIcon icon={task.done ? faUndo : faCheck} />{" "}
            {task.done ? "" : ""}
          </button>
          <button
            className="edit-btn btn"
            onClick={() => startEditing(task.id, task.text)}
            aria-label="Edit task"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="delete-btn btn"
            onClick={() => deleteTask(task.id)}
            aria-label="Delete task"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
