import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { ref, get, update } from "firebase/database";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "male",
    city: "",
  });

  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = ref(db, "users"); 
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          setUser({ ...snapshot.val()[id] }); 
        }
      } catch (error) {
        toast.error("Error fetching user");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const usersRef = ref(db, "users"); 
        const updates = {}; 
        updates[`${id}`] = user; 
        await update(usersRef, updates); 
        toast.success("User updated successfully");
      } catch (error) {
        toast.error("Error updating user");
        console.error(error);
      }
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!user.name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!user.email.trim() || !isValidEmail(user.email)) {
      errors.email = "Valid email is required";
    }

    // Age validation
    if (!user.age || isNaN(user.age) || user.age < 0) {
      errors.age = "Age must be a valid positive number";
    }

    // Gender validation
    if (!user.gender) {
      errors.gender = "Gender is required";
    }

    // City validation
    if (!user.city.trim()) {
      errors.city = "City is required";
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className={`${
                errors.name ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`${
                errors.email ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className={`${
                errors.age ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter age"
            />
            {errors.age && (
              <p className="text-red-500 text-xs italic">{errors.age}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className={`${
                errors.gender ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs italic">{errors.gender}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className={`${
                errors.city ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="text-red-500 text-xs italic">{errors.city}</p>
            )}
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update User
            </button>
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
