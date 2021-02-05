import { Redirect, useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../Hooks/useFetch";

const TaskDetails = () => {
  const [isDeleted, setIsDeleted] = useState(false);
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

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {task && (
        <article>
          <div>{task.description}</div>
          <p>This task has been completed: {task.completed.toString()}</p>
          <button onClick={handleClick}>Delete</button>
          {isDeleted && <Redirect to="/tasks" />}
        </article>
      )}
    </div>
  );
};

export default TaskDetails;
