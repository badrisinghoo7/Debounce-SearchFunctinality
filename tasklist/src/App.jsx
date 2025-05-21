import React, { useState } from "react";
import "./App.css";

const categories = ["All", "Work", "Personal", "Learning"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState({ title: "", category: "Work" });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title.trim(),
        category: newTask.category,
        completed: false,
      },
    ]);
    setNewTask({ title: "", category: "Work" });
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.category === filter);

  const remainingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="container">
      <h2>📝 Task Management Board</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Task title..."
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <select
          value={newTask.category}
          onChange={(e) =>
            setNewTask({ ...newTask, category: e.target.value })
          }
        >
          {categories.slice(1).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filter-section">
        <label>Filter: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span>{task.title}</span>
            <em>({task.category})</em>
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <p>Remaining: {remainingCount}</p>
        <button onClick={handleClearCompleted}>Clear All Completed</button>
      </div>
    </div>
  );
}

export default App;
