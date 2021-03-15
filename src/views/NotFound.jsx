import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>Error 404, Not Found</h1>
      <Link to="/">back to home</Link>
    </>
  );
};

export default NotFound;
