import React from "react";
import Hero from "../components/Home/Hero";
import Trending from "../components/Home/Trending";

const page = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Trending />
    </div>
  );
};

export default page;
