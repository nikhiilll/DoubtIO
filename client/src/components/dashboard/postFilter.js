import { debounce } from "lodash";
import { useCallback, useContext, useState } from "react";
import postsContext from "../../context/PostContext";

const PostFilter = () => {
  const postsCtx = useContext(postsContext);
  const [realPosts, setRealPosts] = useState(postsCtx.posts);
  const [sorted, setSorted] = useState("");

  const filterArray = (searchText) => {
    let filteredPosts = realPosts.filter((realPost) => {
      return (
        realPost.title.toLowerCase().includes(searchText) ||
        realPost.description.toLowerCase().includes(searchText)
      );
    });
    postsCtx.setPosts(filteredPosts);
  };

  const debouncedFilterHandler = debounce(filterArray, 400);

  const formFilterHandler = (e) => {
    e.preventDefault();
    if (!realPosts.length) setRealPosts(postsCtx.posts);
    debouncedFilterHandler(e.target.value.toLowerCase());
  };

  // Sort functionality
  const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
    }
    property = property.substr(1);

    return function (a, b) {
      if (sortOrder === -1 && property === "title") {
        return b[property].localeCompare(a[property]);
      } else if (sortOrder === 1 && property === "title") {
        return a[property].localeCompare(b[property]);
      } else if (sortOrder === 1 && property === "votes") {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    };
  };

  const sortClickHandler = (sortCriteria) => {
    setSorted(sortCriteria);
    let tempPosts = [...postsCtx.posts];
    tempPosts.sort(dynamicSort(sortCriteria));
    postsCtx.setPosts(tempPosts);
  };

  return (
    <div className=" bg-white shadow-sm rounded-md">
      <form
        onSubmit={formFilterHandler}
        className="flex flex-col p-3 space-y-2"
      >
        <input
          type="text"
          placeholder="Filter by title/description"
          className="outline-none p-2 rounded-md border border-gray-300 focus:border-primary"
          onChange={formFilterHandler}
        ></input>
        <div>
          <input
            type="radio"
            name="sortBy"
            id="ascending-title"
            value="asctitle"
            className="hidden"
            onChange={(e) => sortClickHandler("+title")}
          ></input>
          <label
            htmlFor="ascending-title"
            className={
              `ml-2 hover:bg-gray-300 cursor-pointer rounded-lg p-2 flex items-center ` +
              (sorted === "+title" && " bg-primary")
            }
          >
            Sort by title
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="sortBy"
            id="descending-title"
            value="desctitle"
            className="hidden"
            onChange={(e) => sortClickHandler("-title")}
          ></input>
          <label
            htmlFor="descending-title"
            className={
              `ml-2 hover:bg-gray-300 cursor-pointer rounded-lg p-2 flex items-center ` +
              (sorted === "-title" && " bg-primary")
            }
          >
            Sort by title
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="sortBy"
            id="ascending-votes"
            value="ascvotes"
            className="hidden"
            onChange={(e) => sortClickHandler("+votes")}
          ></input>
          <label
            htmlFor="ascending-votes"
            className={
              `ml-2 hover:bg-gray-300 cursor-pointer rounded-lg p-2 flex items-center ` +
              (sorted === "+votes" && " bg-primary")
            }
          >
            Sort by votes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="sortBy"
            id="descending-votes"
            value="descvotes"
            className="hidden"
            onChange={(e) => sortClickHandler("-votes")}
          ></input>
          <label
            htmlFor="descending-votes"
            className={
              `ml-2 hover:bg-gray-300 cursor-pointer rounded-lg p-2 flex items-center ` +
              (sorted === "-votes" && " bg-primary")
            }
          >
            Sort by votes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </label>
        </div>
      </form>
    </div>
  );
};

export default PostFilter;
