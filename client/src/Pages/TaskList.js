import Tasks from "./Tasks";
import useFetch from "../Hooks/useFetch";

const TaskList = () => {
  const { data, isPending, error } = useFetch("/tasks");

  return (
    <div className="tasks">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <Tasks tasks={data} title="All Tasks" />}
    </div>
  );
};

export default TaskList;
