import "../Styles/NewUser.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const NewUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [newUserCreated, setNewUserCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password, age };

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("New user added");
        setIsPending(false);
        setNewUserCreated(true);
        localStorage.setItem("auth-token", data.token);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="newUser">
      <h2>Sign up here!</h2>
      <form onSubmit={handleSubmit}>
        <label>Please enter your full name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Please enter your email ID:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Please enter your age:</label>
        <input
          type="number"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Please enter your password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPending && <button>Complete Registration</button>}
        {isPending && <button disabled>Creating Your Account..</button>}
        {newUserCreated && <Redirect to="/" />}
      </form>
    </div>
  );
};

export default NewUser;
