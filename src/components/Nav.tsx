import React from "react";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex flex-wrap justify-center items-center py-2 text-base bg-amber-300 border-gray-400">
      <Link to={"/"} className="mr-5 hover:text-gray-900 hover:underline">
        Home
      </Link>
      <Link to="batching" className="mr-5 hover:text-gray-900 hover:underline">
        Batching
      </Link>
      <Link
        to="startTransition"
        className="mr-5 hover:text-gray-900 hover:underline"
      >
        StartTransition
      </Link>
      <Link
        to={"useDeferredValue"}
        className="mr-5 hover:text-gray-900 hover:underline"
      >
        UseDeferredValue
      </Link>{" "}
      <Link
        to={"react-router"}
        className="mr-5 hover:text-gray-900 hover:underline"
      >
        React Router and RTK Query
      </Link>
    </nav>
  );
}

export default Nav;
