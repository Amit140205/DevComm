import React from "react";
import useAuthHook from "../hooks/useAuthHook.js";
import { Link, useLocation } from "react-router";
import useLogout from "../hooks/useLogout.js";
import { ShipWheelIcon,BellIcon, LogOutIcon, ContactIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import { project_name } from "../constants/name.js";

const Navbar = () => {
  // what to include => notifications,theme-selector,user,logout

  const { authUser } = useAuthHook();

  const location = useLocation();
  //this is necessary because chat page navbar is of different layout
  const isChatPage = location.pathname?.startsWith("/chat");

  //direct using custom hook
  const { mutate } = useLogout();

  return (
    <div className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-end w-full">

          {/* Logo */}
          {/* only if we are in the chat page */}
          {isChatPage && (
            <div className="p-5 border-b border-base-300">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  {project_name}
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {/* notifications */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link
              to="/notifications"
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case`}
            >
              <BellIcon className="size-5 text-base-content" />
            </Link>
          </div>
          
          {/* avatar */}
          <Link to="/">
          <div className="avatar">
            <div className="w-9 rounded-full">
              
               <img src={authUser?.profilePic} alt="User avatar" />
              
            </div>
          </div>
          </Link>

          {/* theme selector component : todo */}
          <ThemeSelector/>

          {/* feedback */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/dev-helpdesk"
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case`}
            >
              <ContactIcon className="size-5 text-base-content" />
            </Link>
          </div>

          {/* logout button */}
          <button className="btn btn-ghost btn-circle" onClick={mutate}>
            <LogOutIcon className="size-5 text-base-content"/>
          </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Navbar;
