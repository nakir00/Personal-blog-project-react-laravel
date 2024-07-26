import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "post",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-center text-2xl font-bold mb-6 text-[#6D72B4]">
                    Create an account
                </h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-900"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[50px]"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-slate-900"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username25"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[50px]"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[50px]"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[50px]"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-slate-900"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[50px]"
                            value={formData.password_confirmation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password_confirmation: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4] focus:ring-offset-2"
                    >
                        Register
                    </button>
                    <Link
                        className="block mt-4 text-center text-sm text-[#6D72B4] hover:underline"
                        to={"/login"}
                    >
                        Have an account? Login here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
