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
import AllUsers from "./Components/Pages/AllUsers";
import FriendRequest from "./Components/Pages/FriendRequest";
import Friends from "./Components/Pages/Friends";

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
                    <Route
                        path="/search/friends"
                        element={user ? <AllUsers /> : <Login />}
                    />
                    <Route
                        path="/friends/request/:id"
                        element={user ? <FriendRequest /> : <Login />}
                    />
                    <Route
                        path="/requests"
                        element={user ? <FriendRequest /> : <Login />}
                    />
                    <Route
                        path="/friends"
                        element={user ? <Friends /> : <Login />}
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
