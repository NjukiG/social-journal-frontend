import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  useEffect(() => {
    fetch("/protected/journals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.Journals);
        setJournals(data.Journals);
      })
      .catch((error) => {
        console.error("There was an error fetching the journals!", error);
      });
  }, [token]);

  return (
    <div>
      <section className="bg-gray-900 text-white">
        {/* This div below has the link to add trainer form */}
        <div className="flex justify-end mb-4">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
            Choose a Category to add Journal
          </Link>
        </div>

        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Choose a journal to explore.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journals.map((journal) => {
            return (
              <div key={journal.ID}>
                <div className="relative">
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={journal.ImageUrl}
                    alt=""
                  />
                </div>

                <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                  {journal.Title}
                </h1>

                <hr className="w-32 my-6 text-blue-500" />

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {journal.Content.substring(0, 200)} ...
                </p>

                <Link
                  to={`/journals/${journal.ID}`}
                  className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                >
                  Read more?
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Journals;
