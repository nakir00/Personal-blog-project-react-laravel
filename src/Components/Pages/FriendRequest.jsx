import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";

const FriendRequest = () => {
    const { token } = useContext(AppContext);
    const [requests, setRequests] = useState([]);
    const { id } = useParams();

    const handleAcceptFriend = async (requestId) => {
        const res = await fetch(`/api/friends/accept/${requestId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (res.ok) {
            // console.log(data);
            // Mettez à jour la liste des demandes d'amis après l'acceptation
            setRequests((prevRequests) =>
                prevRequests.filter((req) => req.id !== requestId)
            );
        }
    };

    const getAllRequests = async () => {
        const res = await fetch("/api/friend_requests", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            console.log(data);
            setRequests(data);
        }
    };

    useEffect(() => {
        getAllRequests();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-8 lg:p-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                List of friends requests
            </h2>
            <div className="flex flex-col gap-6">
                {requests.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div className="block">
                            <span>{user.username}</span>
                            <h5>{user.name}</h5>
                            <strong> {user.pivot.status}... </strong>
                            {user.pivot.status === "accepted" ? (
                                <div>
                                    <strong></strong>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() =>
                                            handleAcceptFriend(user.id)
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendRequest;
