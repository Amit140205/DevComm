import React from "react";
import useAuthHook from "../hooks/useAuthHook.js";
import { useLocation } from "react-router";
import { Link } from "react-router";
import { BellIcon, ContactIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { project_name } from "../constants/name.js";

const SideBar = () => {
  const { authUser } = useAuthHook();
  //to locate the path
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath)
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* logo */}
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5" >
        <ShipWheelIcon className="size-9 text-primary" />
        <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          {project_name}
        </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {/* home page */}
        <Link to="/"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70"/>
          <span>Home</span>
        </Link>

        {/* friends page */}
        <Link to="/friends"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70"/>
          <span>Friends</span>
        </Link>

        {/* notification page */}
        <Link to="/notifications"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
        >
          <BellIcon className="size-5 text-base-content opacity-70"/>
          <span>Notifications</span>
        </Link>

        {/* feedback and support */}
        <Link to="/dev-helpdesk"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/dev-helpdesk" ? "btn-active" : ""}`}
        >
          <ContactIcon className="size-5 text-base-content opacity-70"/>
          <span>Dev Helpdesk</span>
        </Link>
      </nav>

      {/* user profile */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User avatar" />
            </div>
          </div>

          {/* online */}
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-sm text-success flex items-center gap-1">
              <span className="size-2 bg-success rounded-full inline-block"/>
              Online
            </p>
          </div>

        </div>
      </div>
    </aside>
  );
};

export default SideBar;
