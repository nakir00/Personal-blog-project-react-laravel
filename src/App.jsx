import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import Show from "./Components/Posts/Show";
import Update from "./Components/Posts/Update";
import Comments from "./Components/Posts/Comments";

const App = () => {
    const { user } = useContext(AppContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={user ? <Dashboard /> : <Home />} />

                    {/* Authentifications  */}
                    <Route
                        path="/register"
                        element={user ? <Dashboard /> : <Register />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Dashboard /> : <Login />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/posts/:id" element={<Show />} />
                    <Route path="/posts/:id/comments" element={<Comments />} />

                    <Route
                        path="/posts/edit/:id"
                        element={user ? <Update /> : <Login />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
