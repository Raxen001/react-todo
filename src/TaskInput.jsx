import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskInput = ({ input, setInput, addTask }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="input-group">
      <input
        className="main-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task"
        aria-label="Task input field"
      />
      <button className="main-btn" onClick={addTask} aria-label="Add task">
        <FontAwesomeIcon icon={faPlus} /> Add
      </button>
    </div>
  );
};

export default TaskInput;
