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
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            New Category +
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
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                    >
                      See Details
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
