import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext).user;
  return (
    <Router>
      <Switch>
        {/* If Home at first then use exact keyword in Route */}
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route path="/">{user ? <Home /> : <Register />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
