import { Link } from "react-router-dom";
import "../Styles/Tasks.css";

const Tasks = ({ tasks, title }) => {
  return (
    <div className="containing">
      <div className="task-list">
        <h2>{title}</h2>
        {tasks.map((task) => (
          <div className="task-preview" key={task._id}>
            <Link to={`/tasks/${task._id}`}>
              <h4>{task.description}</h4>
              <p>Task Has Been Completed: {task.completed.toString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
