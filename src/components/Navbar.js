import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div>
      <Link to="/">
          <h1 className="text-white text-2xl font-semibold">My App</h1>
          </Link>
      </div>
      <div>
        <Link to="/add">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Add User
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
