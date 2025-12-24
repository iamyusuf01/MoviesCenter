import { Route, Routes, useMatch } from "react-router";
import Home from "./pages/students/Home";
import Navbar from "./components/student/Navbar";
import CreateAccount from "./components/student/CreateAccount";
import SignIn from "./pages/students/SignIn";
import Admin from "./pages/admin/Admin";
import AddMovies from "./pages/admin/AddMovies";
import UpdateMovie from "./pages/admin/UpdateMovie";
import Movie from "./components/student/Movie";
import AllMovies from "./components/student/AllMovies";


function App() {
  const isAdminRoute = useMatch("/admin/*");
  return (
    <div>
        {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<CreateAccount/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/all-movies" element={<AllMovies/>} />
        <Route path="/movie/:id" element={<Movie/>} />

        {/* Admin */}
        <Route path="/admin" element={<Admin/>} />
        <Route path="/add-movies" element={<AddMovies/>} />
        <Route path="/edit-movie/:id" element={<UpdateMovie/>} />
        <Route path="/delete-movie/:id" element={<UpdateMovie/>} />
        
      </Routes>
    </div>
  );
}

export default App;
