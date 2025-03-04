import { useState, useEffect } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem.js";
import { Dropdown } from "../ui/dropdown/Dropdown.js";
import { Link, useNavigate } from "react-router"; // Use useNavigate from react-router-dom
import { logout } from "../../redux/auth/authApi.js"; // Assuming you have a logout function in your API
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa6";


export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  async function handleLogout() {
    try {
      await logout(); // Call the logout API
      Cookies.remove("token"); // Remove token from cookies
      navigate("/"); // Redirect to sign-in page after logout
    } catch (error) {
      console.error("Logout failed", error); // Handle error appropriately
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
          {/* <img src="/images/user/owner.jpg" alt="User" /> */}
          <FaUser  className="w-6 h-6 mr-2"/>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name || "User"}
        </span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {user?.name || "No email"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email || "No email"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Account settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={handleLogout} // Updated to handle logout
              tag="button" // Changed to button for logout action
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Sign out
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
