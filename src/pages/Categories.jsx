import React, { useEffect, useState } from "react";

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
  return <div>Categories</div>;
};

export default Categories;
