import UserProfile from "./UserProfile";
import useFetch from "../Hooks/useFetch";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:8080/users/me");

  return (
    <div className="profile">
      {error && <Redirect to="/login" />}
      {isPending && <div>Loading...</div>}
      {data && <UserProfile user={data} title="Your Profile" />}
    </div>
  );
};

export default Home;
