import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";

const Navbar = () => {
  return (
    <div className="topnav">
      <Link className="active" to="/">
        Home
      </Link>
      <Link to="/tasks">Your Tasks</Link>
      <Link to="/createtask">Add a new task</Link>
      <Link to="/">About</Link>
      <Logout />
    </div>
  );
};

export default Navbar;
