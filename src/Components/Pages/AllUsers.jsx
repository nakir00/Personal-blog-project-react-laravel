import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useParams, Link } from "react-router-dom";

const AllUsers = () => {
    const { id } = useParams();
    const { token, user } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [requestsSent, setRequestsSent] = useState({});

    const getUsers = async () => {
        const res = await fetch("/api/search/friends", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            setUsers(data.users);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleAddFriend = (userId) => {
        setRequestsSent((prev) => ({
            ...prev,
            [userId]: true,
        }));
    };

    const handleFriendRequest = async (userId) => {
        const res = await fetch(`/api/friends/request/${userId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            handleAddFriend(userId); // Marquer la requête comme envoyée
        }
    };

    // Exclure l'utilisateur actuel de la liste des utilisateurs
    const filteredUsers = users
        .filter((u) => u.id !== user.id) // Exclure l'utilisateur actuel
        .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-8 lg:p-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                Search friends
            </h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex flex-col gap-6">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div className="block">
                            <span>{user.username}</span>
                            <h5>{user.name}</h5>
                        </div>

                        {requestsSent[user.id] ? (
                            <div className="block">
                                <Link to={`/friends/request/${user.id}`}>
                                    View requests
                                </Link>
                            </div>
                        ) : (
                            <button
                                className="bg-[#6D72B4] text-white px-4 py-2 rounded-lg hover:bg-[#575ba3] transition"
                                onClick={() => handleFriendRequest(user.id)}
                            >
                                Add friend
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
