import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditJournal = () => {
  const { ID } = useParams();
  const [formData, setFormData] = useState({
    Title: "",
    Content: "",
    ImageUrl: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  useEffect(() => {
    const fetchJournalDetails = async () => {
      try {
        const response = await fetch(`/protected/journals/${ID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.Journal);
        setFormData({
          Title: data.Journal.Title,
          Content: data.Journal.Content,
          ImageUrl: data.Journal.ImageUrl,
        });
      } catch (error) {
        console.error("Error fetching journal details:", error);
      }
    };

    fetchJournalDetails();
  }, [ID, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/protected/journals/${ID}`, {
        method: "PUT",
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
      console.log("Journal updated successfully:", data);
      navigate(`/journals/${ID}`);
    } catch (error) {
      console.error("Error updating journal:", error);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(`/journals/${ID}`)}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Back -
          </button>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Edit Journal Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="Title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div>
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
                <div>
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
                <div>
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
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate(`/journals/${ID}`)}
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

export default EditJournal;
