import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/socialize-white-logo.png";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser, token, setToken } = useContext(AppContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        }
    };
    return (
        <>
            <header>
                <nav>
                    {user ? (
                        <div>
                            {" "}
                            <p className="text-white"> {user.name} </p>{" "}
                        </div>
                    ) : (
                        <Link to={"/"} className="nav-link">
                            Socialize
                        </Link>
                    )}

                    {/* making navbar update if user is connected */}
                    {/* making navbar update if user is connected */}
                    {/* making navbar update if user is connected */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to={"/dashboard"} className="nav-link">
                                Home
                            </Link>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Navbar;
