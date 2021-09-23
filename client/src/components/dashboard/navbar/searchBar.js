import { useState, useCallback, useRef, useEffect } from "react";
import searchPosts from "../../../services/searchService";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

const SearchBar = () => {
  // Fields to check if the user clicked outside the search bar or its results
  const wrapperRef = useRef(null);
  const [resultsVisible, setResultsVisible] = useState(true);

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const [search, setSearch] = useState({
    query: "",
    isLoading: false,
    results: [],
  });

  // This is the query results function which will be callbacked and debounced
  const queryResults = async (searchText) => {
    let queryResults = await searchPosts(searchText);
    setResultsVisible(true);

    setSearch((prevState) => ({
      ...prevState,
      results: queryResults,
    }));
  };
  const debouncedQueryResults = useCallback(debounce(queryResults, 200), []);

  const inputChangeHandler = (searchText) => {
    setSearch((prevState) => ({
      ...prevState,
      query: searchText,
    }));
    debouncedQueryResults(searchText);
  };
  return (
    <div className="flex flex-col w-full" ref={wrapperRef}>
      <div className="bg-gray-100 text-gray-400 focus-within:text-primary focus-within:ring-1 focus-within:ring-primary p-1 rounded-sm flex items-center justify-center space-x-1 w-3/4 h-10">
        {/* Search SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search"
          value={search.query}
          onChange={(e) => inputChangeHandler(e.target.value)}
          className="bg-gray-100 outline-none w-3/4 md:w-11/12"
        ></input>
      </div>
      {search.results.length && resultsVisible ? (
        <div className="flex flex-col space-y-2 z-30 bg-white border border-gray-200 w-3/4 rounded-sm p-2 shadow-md">
          {search.results.map((result) => (
            <Link to={`/post/` + result._id}>
              <div key={result._id} className="group flex flex-col">
                <p className="font-medium group-hover:text-primary">
                  {result.title}
                </p>
                <p className="text-sm overflow-y-hidden overflow-x-hidden max-h-5">
                  {result.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
