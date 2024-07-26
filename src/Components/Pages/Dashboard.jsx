import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const Dashboard = () => {
    const { user } = useContext(AppContext);

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-screen-lg mx-auto p-5 md:p-8">
                <section className="my-8">
                    <h2 className="text-2xl font-bold mb-4 text-[#6D72B4]">
                        Welcome back, @{user.username}!
                    </h2>

                    <div className="mb-6">
                        <textarea
                            placeholder="What's on your mind?"
                            className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm bg-white min-h-[100px]"
                        />
                        <button className="w-full mt-3 bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4]">
                            Post
                        </button>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-[#6D72B4]">
                            Recent Posts
                        </h3>
                        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                            <div className="flex items-center mb-2">
                                <div>
                                    <h4 className="font-semibold">Jane Doe</h4>
                                    <p className="text-xs text-gray-500">
                                        2 hours ago
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-800 mb-2">
                                This is a sample post content.
                            </p>
                            <div className="flex justify-between text-sm text-gray-600">
                                <button className="w-full bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4]">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
