import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    })
      .then(() => {
        setIsLoggedOut(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div className="logout-button">
      <button onClick={handleClick}>Logout</button>
      {isLoggedOut && <Redirect to="/login" />}
    </div>
  );
};

export default Logout;
