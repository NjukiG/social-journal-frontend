import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logoutUser } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a href="/">
          <img
            className="w-auto h-7"
            src="https://img.icons8.com/?size=100&id=hQTLtNZ2H4Mx&format=png&color=000000"
            alt=""
          />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav
            aria-label="Global"
            className={`md:block ${isOpen ? "block" : "hidden"}`}
          >
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="/contacts"
                >
                  Contacts
                </Link>
              </li>

              {/* Mmeberships Dropdow */}
              {user && (
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>
              )}

              {user && (
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/journals"
                  >
                    Journals
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user && (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
              >
                Logout
              </button>
            )}

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
