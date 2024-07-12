import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import CategoryForm from "./components/CategoryForm";
import CategoryDetails from "./components/CategoryDetails";
import JournalForm from "./components/JournalForm";
import Journals from "./pages/Journals";
import JournalDetails from "./components/JournalDetails";
import EditJournal from "./components/EditJournal";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CategoryForm />} />
          <Route path="/categories/:ID" element={<CategoryDetails />} />
          <Route path="/journals" element={<Journals />} />
          <Route
            path="/categories/:ID/journals/create"
            element={<JournalForm />}
          />
          <Route path="/journals/:ID" element={<JournalDetails />} />
          <Route path="/journals/:ID/edit" element={<EditJournal />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
