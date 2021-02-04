import "../Styles/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  //   const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    setIsPending(true);

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("User login details sent");
        setIsPending(false);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  return (
    <div className="login">
      <h2>Already have an account?</h2>
      <h4>Sign-in below!</h4>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPending && <button>Login</button>}
        {isPending && <button disabled>Logging In...</button>}
      </form>
      <p>Don't have an Account yet?</p>
      <p>
        Sign Up <Link to="/newUser">here</Link>!
      </p>
    </div>
  );
};

export default Login;
