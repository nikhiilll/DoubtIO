import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard/dashboard";
import Register from "./components/register";
import Post from "./components/post/post";
import Profile from "./components/profile/profile";
import ProtectedRoute from "./components/protectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/post/:postId" component={Post} />
          <ProtectedRoute path="/profile/:username" component={Profile} />
          <Route path="*" component={Login}></Route>
          {/* <Route path="/dashboard" exact component={Dashboard}></Route> */}
          {/* <Route path="/post/:postId" exact component={Post}></Route>
          <Route path="/profile/:userId" exact component={Profile}></Route> */}
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
