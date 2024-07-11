import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { ID } = useParams();
  const [catDetails, setCatDetails] = useState({});
  // const [journals, setJournals] = useState([]);
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
        // console.log("THis is the journals ", data.Category.Journals);
        // setJournals(data.Category.Journals);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [token, ID]);
  return (
    <section class="bg-white dark:bg-gray-900">
      <div className="flex justify-end mb-4">
        <Link
          to={`/categories/${ID}/journals/create`}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Add {catDetails.Title} +
        </Link>
      </div>
      <div class="container px-6 py-10 mx-auto">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            {catDetails.Title}
          </h1>

          <p class="max-w-lg mx-auto mt-4 text-gray-500">
            Salami mustard spice tea fridge authentic Chinese food dish salt
            tasty liquor. Sweet savory foodtruck pie.
          </p>
        </div>
        {/* vfghcdjnk */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {catDetails.Journals ? (
            catDetails.Journals.map((journal) => (
              <div>
                <div class="relative">
                  <img
                    class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={journal.ImageUrl}
                    alt=""
                  />
                </div>

                <h1 class="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                  {journal.Title}
                </h1>

                <hr class="w-32 my-6 text-blue-500" />

                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {journal.Content.substring(0, 200)} ...
                </p>

                <a
                  href="#"
                  class="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                >
                  Read more?
                </a>
              </div>
            ))
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {" "}
              <div>
                <div class="relative">
                  {" "}
                  <p>No journal entries found.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* cg jhbn */}
      </div>
    </section>
  );
};

export default CategoryDetails;
