import { useState } from "react";
import { Redirect } from "react-router-dom";
import "../Styles/CreateTask.css";

const CreateTask = () => {
  const [description, setDescription] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { description };

    setIsPending(true);

    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("New task added");
      setIsPending(false);
      setIsAdded(true);
    });
  };
  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <div className="containing">
        <div className="form-div">
          <form onSubmit={handleSubmit}>
            <label>Task Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {!isPending && <button>Add Task</button>}
            {isPending && <button disabled>Adding Task...</button>}
            {isAdded && <Redirect to="/tasks" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
