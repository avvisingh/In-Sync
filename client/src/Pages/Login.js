import "../Styles/Login.css";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    setIsPending(true);

    fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("auth-token", data.token);
        setIsPending(false);
        setIsLoggedIn(true);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  return (
    <div className="containing">
      <div className="login">
        <h2>Already have an account?</h2>
        <h4>Sign-in below!</h4>
        <form onSubmit={handleSubmit}>
          <label className="email-label">Email:</label>
          <input
            className="email-input"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="password-label">Password:</label>
          <input
            className="password-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isPending && <button>Login</button>}
          {isPending && <button disabled>Logging In...</button>}
          {isLoggedIn && <Redirect to="/" />}
        </form>
        <p>Don't have an Account yet?</p>
        <p>
          Sign Up <Link to="/newUser">here</Link>!
        </p>
      </div>
    </div>
  );
};

export default Login;
