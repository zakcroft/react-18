import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export function PageLayout() {
  return (
    <>
      <Nav />
      <div className="flex overflow-auto flex-col pt-10 h-screen text-xl text-center text-white bg-gray-800">
        <Outlet />
      </div>
    </>
  );
}
