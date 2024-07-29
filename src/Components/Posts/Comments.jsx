import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Comments = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState();
    const [formData, setFormData] = useState({
        content: "",
    });
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

    // HANDLING COMMENT SUBMISSION
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/posts/${id}/comments`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);

        if (data.errors) {
            setErrors(data.errors);
        } else {
            getPost();
            setFormData({
                content: "",
            });
            navigate(`/posts/${id}`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-8 lg:p-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                Comment the post
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
                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <textarea
                            className="w-full p-2 border rounded-lg mb-2"
                            rows="4"
                            name="content"
                            placeholder="Write your comment here..."
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                        ></textarea>
                        {errors.content && (
                            <p className="text-red-500 mb-2  text-xs mt-1">
                                {errors.content[0]}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="bg-[#6D72B4] text-white py-2 px-4 rounded-lg"
                        >
                            Submit Comment
                        </button>
                    </form>
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default Comments;
