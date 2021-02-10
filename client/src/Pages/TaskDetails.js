import { Redirect, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import "../Styles/TaskDetails.css";

const TaskDetails = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const { id } = useParams();
  const { data: task, error, isPending } = useFetch(
    "http://localhost:8080/tasks/" + id
  );

  const handleClick = () => {
    fetch("http://localhost:8080/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    }).then(() => {
      console.log("Delete Button pressed. Task is probably gone");
      setIsDeleted(true);
    });
  };

  const handleUpdateClick = () => {
    fetch(`http://localhost:8080/tasks/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: "true" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    })
      .then(() => {
        setUpdateClicked(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="containing">
      <div className="task-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {task && (
          <article>
            <h2>{task.description}</h2>
            <p>This task has been completed: {task.completed.toString()}</p>
            <button className="delete-button" onClick={handleClick}>
              Delete
            </button>
            {isDeleted && <Redirect to="/tasks" />}
            <button className="update-button" onClick={handleUpdateClick}>
              Update to Completed
            </button>
            {updateClicked && <Redirect to="/tasks" />}
          </article>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
