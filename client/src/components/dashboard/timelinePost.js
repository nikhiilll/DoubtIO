import { Link } from "react-router-dom";

const TimelinePost = (props) => {
  return (
    <div className="flex w-full border bg-white shadow-sm border-gray-100 rounded-md p-4">
      {/* Left Votes Div */}
      <div className="flex flex-col w-1/6 items-center justify-center p-2 text-sm">
        <p>{props.votes}</p>
        <p>Votes</p>
      </div>

      {/* Right Div for details */}
      <div className="flex flex-col w-5/6 space-y-4">
        <Link
          to={`/post/` + props._id}
          className="font-medium text-gray-800 hover:text-primary"
        >
          {props.title}
        </Link>
        <p className="max-h-10 text-sm overflow-y-hidden overflow-x-visible">
          {props.description}
        </p>
        <div className="flex flex-wrap w-full">
          {props.tags.map((tag) => {
            return (
              <p
                key={tag}
                className="bg-gray-100 text-primary rounded-md p-1 mr-2 sm:mt-2  text-sm flex items-center justify-center"
              >
                {tag}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelinePost;
