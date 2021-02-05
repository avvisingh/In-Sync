import { useHistory } from "react-router-dom";

const Logout = () => {
  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  };
  return (
    <div className="logout-button">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;
