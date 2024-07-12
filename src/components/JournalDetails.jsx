import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const JournalDetails = () => {
  const { ID } = useParams();
  const [journalDetails, setJournalDetails] = useState({});
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/protected/journals/" + ID, {
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
        console.log(data.Journal);
        setJournalDetails(data.Journal);
      })
      .catch((error) => {
        console.error("There was an error fetching the journal!", error);
      });
  }, [token, ID]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/protected/journals/${ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Journal deleted successfully");
      navigate(`/journals`);
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  if (!journalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
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
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {journalDetails.Title}
              </h1>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src={journalDetails.ImageUrl}
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>{journalDetails.Content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <Link
          to={`/journals/${journalDetails.ID}/edit`}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded m-2"
        >
          Edit Journal
        </Link>

        <button
          onClick={handleDelete}
          to={`/journals/${journalDetails.ID}/delete`}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded m-2"
        >
          Delete
        </button>
        {/*  */}
      </div>
    </div>
  );
};

export default JournalDetails;
