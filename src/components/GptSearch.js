import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestion";
import { BACKGROUND } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="absolute -z-10 w-full h-screen">
        <img
          src={BACKGROUND}
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GptSearch;
