import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const JournalForm = () => {
  const { ID } = useParams();

  const [formData, setFormData] = useState({
    Title: "",
    Content: "",
    ImageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
      const response = await fetch(`/protected/categories/${ID}/journals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Journal created successfully:", data);
      navigate("/journals");
    } catch (error) {
      console.error("Error creating a journal:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
      >
        {/* This div below has the link to add class form */}
        <div className="flex justify-end mb-4">
          <Link
            className="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            to="/journals"
          >
            <span className="sr-only"> Download </span>

            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </Link>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Journal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="Title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="">
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    value={formData.Title}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="ImageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <div className="">
                  <input
                    type="text"
                    name="ImageUrl"
                    id="ImageUrl"
                    value={formData.ImageUrl}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="Content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Journal Content
                </label>
                <div className="">
                  <textarea
                    id="Content"
                    name="Content"
                    rows={5}
                    value={formData.Content}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(`/journals`)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default JournalForm;
