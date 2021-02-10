import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Styles/App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewUser from "./Pages/NewUser";
import TaskList from "./Pages/TaskList";
import TaskDetails from "./Pages/TaskDetails";
import CreateTask from "./Pages/CreateTask";
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/newUser">
              <NewUser />
            </Route>
            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>
            <Route exact path="/tasks">
              <Navbar />
              <TaskList />
            </Route>
            <Route path="/tasks/:id">
              <Navbar />
              <TaskDetails />
            </Route>
            <Route path="/createtask">
              <Navbar />
              <CreateTask />
            </Route>
            <Route path="/about">
              <Navbar />
              <About />
            </Route>
            {/* <Route exact path="/myprofile">
                <Home />
              </Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
