import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/user";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login";
import Loading from "./components/Design/Loading/Loading";
import { useEffect } from "react";

function App() {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {/* <Header /> */}
      {loading && <Loading />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
