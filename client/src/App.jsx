import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Update from "./components/Update";
   
const App = () => {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/Register">Create</a>
        <a href="/Update">Update</a>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Update" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
