import UserProfile from "./UserProfile";
import useFetch from "../Hooks/useFetch";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:8080/users/me");

  return (
    <div className="profile">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <UserProfile user={data} title="Your Profile" />}
    </div>
  );
};

export default Home;
