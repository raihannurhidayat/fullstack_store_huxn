import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#858585] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-1 bg-white my-1 transition-all"></div>
            <div className="w-6 h-1 bg-white my-1 transition-all"></div>
            <div className="w-6 h-1 bg-white my-1 transition-all"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#858585] p-4 fixed right-6 top-7 rounded transition-all">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2e2d2d] rounded-lg"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
