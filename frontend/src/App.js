import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/user";
import { loadWishlist } from "./actions/wishlist";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login";
import Today from "./components/Today/Today";
import Loading from "./components/Design/Loading/Loading";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadWishlist());
  }, []);
  return (
    <Router>
      {/* <Header /> */}
      <ScrollToTop />
      {loading && <Loading />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<Login />} />
        <Route exact path="/terms-and-conditions" element={<Login />} />
        <Route exact path="/privacy-policy" element={<Login />} />
        <Route exact path="/faqs" element={<Login />} />
        <Route exact path="/today" element={<Today />} />
        <Route exact path="/:day" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
