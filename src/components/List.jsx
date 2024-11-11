import { useState } from "react";

export default function List() {
  const [tasks, setTasks] = useState(["Take a shower", "Take a nap"]);
  const [newTask, setNewTask] = useState("");

  function inputValue(event) {
    setNewTask(event.target.value);
  }
  function addTask() {
    if (newTask.trim()) {
      setTasks((tasks) => [...tasks, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    setTasks((t) => t.filter((_, i) => i !== index));
  }
  function moveUpTask(index) {
    if (index > 0) {
      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
        return updatedTasks;
      });
    }
  }
  function moveDownTask(index) {
    if (index < tasks.length - 1) {
      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        return updatedTasks;
      });
    }
  }

  return (
    <div className="list">
      <div className="form">
        <input
          className="px-3 py-2 border-0"
          placeholder="Enter a task . . ."
          value={newTask}
          onChange={inputValue}
          type="text"
        />
        <button className="bg-success text-light px-3 py-2 border-0" type="submit" onClick={addTask}>
          Add
        </button>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <h5 key={index} className="task bg-light text-dark p-3 rounded">
            {task}
            <span className="ms-4">
              <button className="bg-danger" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="bg-info" onClick={() => moveUpTask(index)}>
                ▲
              </button>
              <button className="bg-info" onClick={() => moveDownTask(index)}>
                ▼
              </button>
            </span>
          </h5>
        ))
      ) : (
        <h3 className="text-center">Nothing here yet!</h3>
      )}
    </div>
  );
}
