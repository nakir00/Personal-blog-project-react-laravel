import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Show = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { token, user } = useContext(AppContext);
    const navigate = useNavigate();

    // GETTING POSTS
    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (res.ok) {
            setPost(data.post);
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // DELETE POST
    // DELETE POST
    // DELETE POST

    const handleDelete = async (e) => {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-8 lg:p-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                Post details
            </h2>
            {user && post ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {post.title}
                    </h1>
                    <p className="text-gray-600 text-sm mb-2">
                        Posted by @{post.user.username} -{" "}
                        {formatDate(post.created_at)}
                    </p>
                    <p className="text-gray-800 text-lg mb-4">{post.content}</p>
                    {user && user.id === post.user_id && (
                        <div className="flex items-center justify-end gap-4">
                            <Link
                                to={`/posts/edit/${post.id}`}
                                className="font-bold text-lg"
                            >
                                Edit
                            </Link>
                            <form onSubmit={handleDelete}>
                                <button className="text-lg font-bold error">
                                    Delete
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default Show;
