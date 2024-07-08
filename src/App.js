import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      Social Journal App...
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
