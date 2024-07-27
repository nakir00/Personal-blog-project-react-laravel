import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const { token, user } = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // GETTING POSTS
    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (res.ok) {
            if (data.post.user_id === user.id) {
                navigate("/login");
            }
            setFormData({
                title: data.post.title,
                content: data.post.content,
            });
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    // ADDING POSTS
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const handleUpdatePosts = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            getPost();
            setFormData({
                title: "",
                content: "",
            });
            navigate("/dashboard");
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-screen-lg mx-auto p-5 md:p-8">
                <section className="my-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#6D72B4]">
                        Edit the post
                    </h2>

                    <form className="mb-6" onSubmit={handleUpdatePosts}>
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm md:text-base font-medium text-slate-900"
                            >
                                Post title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Post title"
                                className="block w-full rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm md:text-base bg-white min-h-[50px]"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.title[0]}
                                </p>
                            )}
                        </div>
                        <div>
                            <textarea
                                name="content"
                                placeholder="What's on your mind?"
                                className="block w-full mt-3 rounded-md border-0 p-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#6D72B4] sm:text-sm md:text-base bg-white min-h-[100px]"
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }
                            />
                            {errors.content && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.content[0]}
                                </p>
                            )}
                        </div>
                        <button className="w-30 mt-3 bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4]">
                            Edit the post
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Update;
