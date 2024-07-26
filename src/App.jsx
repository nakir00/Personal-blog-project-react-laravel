import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";

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
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
