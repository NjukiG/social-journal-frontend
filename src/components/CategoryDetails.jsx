import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { ID } = useParams();
  const [catDetails, setCatDetails] = useState({});
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  useEffect(() => {
    fetch("/protected/categories/" + ID, {
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
        console.log(data.Category);
        setCatDetails(data.Category);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [token, ID]);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-end mb-4">
        <Link
          to={`/categories/${ID}/journals/create`}
          className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
          Add {catDetails.Title} +
        </Link>
      </div>
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            {catDetails.Title}
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Salami mustard spice tea fridge authentic Chinese food dish salt
            tasty liquor. Sweet savory foodtruck pie.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {catDetails.Journals ? (
            catDetails.Journals.map((journal) => (
              <div>
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
            ))
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {" "}
              <div>
                <div className="relative">
                  {" "}
                  <p>No journal entries found.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
