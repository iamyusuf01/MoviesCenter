import { Route, Routes, useMatch } from "react-router";
import Home from "./pages/user/Home";
import Navbar from "./components/user/Navbar";
import CreateAccount from "./components/user/CreateAccount";
import SignIn from "./pages/user/SignIn";
import Admin from "./pages/admin/Admin";
import AddMovies from "./pages/admin/AddMovies";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import MovieList from "./pages/user/MoviesList";
import AllMovies from "./components/user/AllMovies";
import UpdateMovies from "./pages/admin/UpdateMovies";

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
        <Route path="/search" element={<MovieList />} />
        <Route path="/all" element={<AllMovies />} />
        

        {/* Admin routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/edit/:id" element={<UpdateMovies />} />
          <Route path="add-movie" element={<AddMovies />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
