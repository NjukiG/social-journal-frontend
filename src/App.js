import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";
import Categories from "./pages/Categories";
import CategoryForm from "./components/CategoryForm";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CategoryForm />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
