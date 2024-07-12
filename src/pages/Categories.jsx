import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  useEffect(() => {
    fetch("/protected/categories", {
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
        setCategories(data.Categories);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [token]);
  return (
    <div>
      <section className="bg-gray-900 text-white">
        {/* This div below has the link to add trainer form */}
        <div className="flex justify-end mb-4">
          <Link
            to="/categories/create"
            className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
            Add Category +
          </Link>
        </div>

        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Choose a category to explore.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((categoryItem) => {
            return (
              <article
                key={categoryItem.ID}
                className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <img
                  alt=""
                  src={
                    categoryItem.ImageURL
                      ? categoryItem.ImageURL
                      : "https://images.unsplash.com/photo-1632077804406-188472f1a810?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                  <div className="p-4 sm:p-6">
                    <a href={`/categories/${categoryItem.ID}`}>
                      <h3 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        {categoryItem.Title}
                      </h3>
                    </a>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Link
                      to={`/categories/${categoryItem.ID}`}
                      // onClick={LoadDetails}
                      className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      Open Category
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
