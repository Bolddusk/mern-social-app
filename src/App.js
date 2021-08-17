import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* If Home at first then use exact keyword in Route */}
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
