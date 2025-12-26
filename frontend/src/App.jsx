import { Route, Routes, useMatch } from "react-router";
import Home from "./pages/students/Home";
import Navbar from "./components/student/Navbar";
import CreateAccount from "./components/student/CreateAccount";
import SignIn from "./pages/students/SignIn";
import Admin from "./pages/admin/Admin";
import AddMovies from "./pages/admin/AddMovies";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import MoviesPage from "./pages/students/MoviePage";

function App() {
  const isAdminRoute = useMatch("/admin/*");
  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/search" element={<MoviesPage />} />
        

        {/* Admin routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="movies" element={<Movies />} />
          <Route path="add-movie" element={<AddMovies />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
