import React, { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { registerUser, user } = useAuth();
  const navigate = useNavigate();
  const registerForm = useRef(null);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    // Form details
    const FirstName = registerForm.current.FirstName.value;
    const LastName = registerForm.current.LastName.value;
    const Email = registerForm.current.Email.value;
    const Password = registerForm.current.Password.value;
    const Role = registerForm.current.Role.value;

    try {
      const userInfo = {
        FirstName,
        LastName,
        Email,
        Password,
        Role,
      };
      await registerUser(userInfo);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1579017308347-e53e0d2fc5e9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img
                src="https://img.icons8.com/?size=100&id=hQTLtNZ2H4Mx&format=png&color=000000"
                alt=""
              />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Social Journal
            </h2>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div class="flex justify-center mx-auto">
              <img
                class="w-auto h-7 sm:h-8"
                src="https://img.icons8.com/?size=100&id=hQTLtNZ2H4Mx&format=png&color=000000"
                alt=""
              />
            </div>
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-2xl font-bold sm:text-3xl text-gray-300">
                Register an account!
              </h1>
            </div>
            <form
              action="#"
              method="POST"
              className="mt-8 grid grid-cols-6 gap-6"
              ref={registerForm}
              onSubmit={handleRegister}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  placeholder="Enter your First Name"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  placeholder="Enter your Last Name"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="Email"
                  placeholder="Enter your Email Address"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="Password"
                  placeholder="Enter your Password"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Role
                </label>

                <input
                  type="text"
                  id="Role"
                  name="Role"
                  placeholder="Role is either Author or Admin"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Registration;
