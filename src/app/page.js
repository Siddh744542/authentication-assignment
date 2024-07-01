"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success!");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/userdata");
    console.log(res.data.data);
    setData(res.data.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">
          {!data ? "Loading..." : `Welcome, ${data?.username}! `}
        </h2>
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
