import React from "react";

const Hero = () => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521316973612-36489899f29b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            Share your thoughts, feelings and{" "}
            <span className="text-blue-400">Ideas</span> today
          </h1>
          <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            Start project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
