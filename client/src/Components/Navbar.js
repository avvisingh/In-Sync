import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="topnav">
      <Link className="active" to="/">
        Home
      </Link>
      <Link to="/tasks">Your Tasks</Link>
      <Link to="/">Contact</Link>
      <Link to="/">About</Link>
    </div>
  );
};

export default Navbar;
