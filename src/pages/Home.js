import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { ref, get, remove } from "firebase/database";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [noUsersFound, setNoUsersFound] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          setUsers({ ...snapshot.val() });
        } else {
          setNoUsersFound(true);
        }
      } catch (error) {
        console.error("Firebase error:", error);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userRef = ref(db, `users/${id}`);
        await remove(userRef);
        toast.success("User deleted successfully");


        setUsers((prevUsers) => {
          const updatedUsers = { ...prevUsers };
          delete updatedUsers[id];
          return updatedUsers;
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user");
      }
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">
        User Management System
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <HashLoader color={"#36D7B7"} loading={loading} size={50} />
        </div>
      ) : noUsersFound ? (
        <p className="text-center text-red-500 font-semibold">
          Users not found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users).map((id, index) => (
                <tr
                  key={id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-4 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {users[id].name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {users[id].email}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {users[id].age}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {users[id].gender}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {users[id].city}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <Link
                        to={`/view/${id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg md:py-2 md:px-4 mr-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${id}`}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded-lg md:py-2 md:px-4 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg md:py-2 md:px-4"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
