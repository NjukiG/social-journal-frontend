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
        console.log(data);
        setCatDetails(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [token]);
  return (
    <section class="bg-white dark:bg-gray-900">
      <div className="flex justify-end mb-4">
        <Link
          to={`/categories/${ID}/journals/create`}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Add a Journal Entry +
        </Link>
      </div>
      <div class="container px-6 py-10 mx-auto">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            From the blog
          </h1>

          <p class="max-w-lg mx-auto mt-4 text-gray-500">
            Salami mustard spice tea fridge authentic Chinese food dish salt
            tasty liquor. Sweet savory foodtruck pie.
          </p>
        </div>
        //////////////////////////////////////////////
        {!catDetails ? (
          <div>
            <h1>THere are no details of {catDetails.Title}</h1>
            <div className="flex justify-end mb-4">
              <Link
                to={`/categories/${ID}/journals/create`}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Add a Journal Entry +
              </Link>
            </div>
          </div>
        ) : (
          <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <div class="relative">
                <img
                  class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div class="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                  <img
                    class="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />

                  <div class="mx-4">
                    <h1 class="text-sm text-gray-700 dark:text-gray-200">
                      Tom Hank
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Creative Director
                    </p>
                  </div>
                </div>
              </div>

              <h1 class="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                What do you want to know about UI
              </h1>

              <hr class="w-32 my-6 text-blue-500" />

              <p class="text-sm text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis fugit dolorum amet dolores praesentium, alias nam?
                Tempore
              </p>

              <a
                href="#"
                class="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
              >
                Read more
              </a>
            </div>
          </div>
        )}
        //////////////////////////////////////////////
      </div>
    </section>
  );
};

export default CategoryDetails;
