import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
