import { useLoaderData } from "react-router-dom";
import { JobsWithPagination } from "../types";

const SearchContainer = () => {
  const data = useLoaderData() as JobsWithPagination;
  console.log(data);
  return (
    <div>
      <h2>SearchContainer</h2>
    </div>
  );
};

export default SearchContainer;
