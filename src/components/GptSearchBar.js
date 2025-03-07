// @ts-nocheck
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieRsult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const fetchMovieByTitle = async (title) => {
    //make an API call to TMDB api and get movie details based on title
    //and update the state with the movie details
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        title +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    //make an API call to GPT api and get movie results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". Only give me names of 5 movies, # separated like the example result given ahead. Example : The Gorge# Serendipity# Princess Diaries 1.";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o-mini",
    });
    console.log(gptResults.choices);
    if (!gptResults.choices) {
      //TODO: Error handling
    }
    const gptMovies = gptResults.choices?.[0]?.message?.content.split("#");
    const data = gptMovies.map((movie) => fetchMovieByTitle(movie));
    const tmdbResults = await Promise.all(data);
    console.log(tmdbResults);
    dispatch(
      addGptMovieRsult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[30%] md:pt-[10%] flex justify-center">
      <form
        className="md:w-1/2 bg-black grid grid-cols-12 w-full "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="col-span-9 p-4 m-4"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>

        <button
          className="col-span-3 py-2 px-2 m-3 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
