import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import { toast } from "react-toastify";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          setUser({ ...snapshot.val()[id] });
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Firebase error:", error);
        toast.error("Error fetching user");
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white overflow-hidden w-[400px] rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">User Details</h1>
        <div>
          <label className="block text-gray-700 text-sm font-bold">Name:</label>
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold">Email:</label>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold">Age:</label>
          <span className="text-gray-800">{user.age}</span>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold">Gender:</label>
          <span className="text-gray-800">{user.gender}</span>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold">City:</label>
          <span className="text-gray-800">{user.city}</span>
        </div>
        <div className="mb-4">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
