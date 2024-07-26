import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg";

const Home = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100 p-4 md:p-8 h-screen">
            <div className="w-full md:w-1/2 p-4 flex justify-center md:justify-start">
                <img
                    src={heroImg}
                    alt="Hero"
                    className="rounded-lg shadow-lg max-h-full w-full md:w-auto"
                />
            </div>
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#6D72B4]">
                    Welcome to SOCIALIZE
                </h1>
                <p className="text-base md:text-lg text-gray-700 mb-6">
                    Connect with your friends and the world around you on
                    SOCIALIZE. Share your moments, follow your interests, and
                    stay updated with the latest news.
                </p>
                <Link
                    to={"/register"}
                    className="bg-[#6D72B4] text-white py-2 px-4 rounded hover:bg-[#5c62a5] w-full md:w-auto text-center"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Home;
