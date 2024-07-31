import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";

const Friends = () => {
    const { token } = useContext(AppContext);
    const [friends, setFriends] = useState([]);
    const { id } = useParams();

    const getFriends = async () => {
        const res = await fetch("/api/friends", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            console.log(data);
            setFriends(data);
        }
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-8 lg:p-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#6D72B4]">
                Your friends
            </h2>
            <div className="flex flex-col gap-6">
                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div className="block">
                            <span>{friend.username}</span>
                            <h5>{friend.name}</h5>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;
