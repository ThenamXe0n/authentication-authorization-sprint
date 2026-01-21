import React from "react";
import { Link } from "react-router";
import { pagePath } from "../routes/pagePath";
import { useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

function Home() {
  useEffect(() => {
    axiosInstance.get("/protected");
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center font-bold text-4xl">
      <Link className="text-white bg-black p-3 rounded-md" to={pagePath.login}>
        Login
      </Link>
    </div>
  );
}

export default Home;
