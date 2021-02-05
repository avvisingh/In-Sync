import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewUser from "./Pages/NewUser";
import TaskList from "./Pages/TaskList";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
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
                <TaskList />
                <Home />
              </Route>
              {/* <Route exact path="/myprofile">
                <Home />
              </Route> */}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
