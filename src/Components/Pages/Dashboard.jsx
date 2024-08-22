import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const { token, user } = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // GETTING POSTS
    const getPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();

        if (res.ok) {
            // console.log(data);

            setPosts(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // ADDING POSTS
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        cannot_comment: false,
    });
    const [image, setImage]= useState()

    const handleCreatePosts = async (e) => {
        e.preventDefault();
        console.log({formData:formData, image:image});
        const dataForm = new FormData()
        dataForm.append('title', formData.title)
        dataForm.append('content', formData.content)
        dataForm.append('cannot_comment', formData.cannot_comment)
        dataForm.append('image', image)
        const res = await fetch("/api/posts", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            body: dataForm,
        });

        const data = await res.json();
        console.log(data);
        
        if (data.errors) {
            setErrors(data.errors);
        } else {
            console.log(data);
            getPosts();
            setFormData({
                title: "",
                content: "",
                image: null,
                cannot_comment: false,
            });
           // navigate("/dashboard");
        } 
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-screen-lg p-5 mx-auto md:p-8">
                <section className="my-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#6D72B4]">
                        Welcome back!
                    </h2>

                    <form
                        className="mb-6"
                        onSubmit={handleCreatePosts}
                        //encType="multipart/form-data"
                    >
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium md:text-base text-slate-900"
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
                                <p className="mt-1 text-xs text-red-500">
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
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.content[0]}
                                </p>
                            )}
                            <input
                                value={image}
                                onChange={(e) =>
                                    setImage(e.target.files[0]) 
                                
                                }
                                className="mt-3"
                                type="file"
                                name="image"
                            />
                        </div>

                        <label
                            htmlFor=""
                            className="flex items-center gap-2 mt-2 text-sm font-medium md:text-base text-slate-900"
                        >
                            Disable comments
                            <input
                                type="checkbox"
                                name="cannot_comment"
                                id=""
                                className="cursor-pointer"
                                value={formData.cannot_comment}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        cannot_comment: e.target.checked,
                                    })
                                }
                            />
                        </label>
                        <button className="w-30 mt-3 bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4]">
                            Share something
                        </button>
                    </form>

                    {/* BODY  */}
                    {/* BODY  */}
                    {/* BODY  */}
                    {/* BODY  */}

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                            Recent Posts
                        </h3>
                        {user && posts.length > 0 ? (
                            posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="p-4 mb-6 bg-white rounded-lg shadow-lg"
                                >
                                    <div className="flex items-center mb-2">
                                        <div>
                                            <h4 className="text-lg font-semibold md:text-xl">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <p className="mb-2 text-base text-gray-800 md:text-lg">
                                        {post.content}
                                    </p>
                                    <p className="pb-2 text-xs text-gray-500 md:text-sm">
                                        by @{post.user.username} -{" "}
                                        {formatDate(post.created_at)}
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        {post.cannot_comment ? (
                                            <Link
                                                to={`/posts/${post.id}`}
                                                className="text-lg"
                                            >
                                                Details
                                            </Link>
                                        ) : (
                                            <Link
                                                to={`/posts/${post.id}/comments`}
                                                className="w-30 bg-[#6D72B4] text-white py-2 px-4 rounded-md hover:bg-[#5c62a5] focus:outline-none focus:ring-2 focus:ring-[#6D72B4]"
                                            >
                                                Comment
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>There are no posts</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
