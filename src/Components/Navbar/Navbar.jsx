import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/socialize-white-logo.png";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser, token, setToken } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu

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

    const handleLinkClick = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false); // Close menu on mobile
        }
    };

    return (
        <>
            <header className="bg-gray-800 p-4 w-full">
                <nav>
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-white text-2xl ml-2">
                                Socialize
                            </span>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white block lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        {/* Navbar Links */}
                        <div
                            className={`lg:flex lg:items-center lg:space-x-4 ${
                                isOpen ? "block" : "hidden"
                            }`}
                        >
                            {user ? (
                                <div className="flex flex-col lg:flex-row lg:space-x-4">
                                    <Link
                                        to={"/dashboard"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={"/search/friends"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Search friends
                                    </Link>
                                    <Link
                                        to={"/requests"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Requests
                                    </Link>
                                    <Link
                                        to={"/friends"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Friends
                                    </Link>
                                    <form onSubmit={handleLogout}>
                                        <button
                                            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                            onClick={handleLinkClick}
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex flex-col lg:flex-row lg:space-x-4">
                                    <Link
                                        to={"/register"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        to={"/login"}
                                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                                        onClick={handleLinkClick}
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Navbar;
