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
    <section class="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
      >
        {/* This div below has the link to add class form */}
        <div className="flex justify-end mb-4">
          <Link
            to="/journals"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Back -
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
                    rows={3}
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
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default JournalForm;
