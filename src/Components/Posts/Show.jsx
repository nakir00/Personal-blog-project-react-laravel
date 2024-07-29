import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Show = () => {
    const [post, setPost] = useState(null);
    const [userMap, setUserMap] = useState({});
    const { id } = useParams();
    const { token, user, getUsers } = useContext(AppContext);
    const navigate = useNavigate();

    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (res.ok) {
            setPost(data.post);
            const userIds = data.post.comments.map(
                (comment) => comment.user_id
            );
            const users = await getUsers(userIds);
            const userMap = users.reduce((map, user) => {
                map[user.id] = user;
                return map;
            }, {});
            setUserMap(userMap);
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                navigate("/dashboard");
            }
        }
    };

    const handleDeleteComments = async (e, commentId) => {
        e.preventDefault();

        const res = await fetch(`/api/comments/${commentId}`, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            // Mettre à jour l'état du post après suppression du commentaire
            setPost((prevPost) => ({
                ...prevPost,
                comments: prevPost.comments.filter(
                    (comment) => comment.id !== commentId
                ),
            }));
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
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-6">
                        Comments
                    </h3>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="bg-gray-100 p-4 rounded-lg mb-4"
                            >
                                <p className="text-gray-800">
                                    {comment.content}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Commented by -{" "}
                                    {formatDate(comment.created_at)}
                                </p>
                                {user && user.id === comment.user_id && (
                                    <div className="flex items-center justify-end gap-4">
                                        <form
                                            onSubmit={(e) =>
                                                handleDeleteComments(
                                                    e,
                                                    comment.id
                                                )
                                            }
                                        >
                                            <button className="text-lg font-bold error">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No comments yet.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default Show;
