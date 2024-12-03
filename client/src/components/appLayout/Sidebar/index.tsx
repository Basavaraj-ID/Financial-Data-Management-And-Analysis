import { NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/images/logo.png";
import { memo, useState } from "react";
import menuItems from "../../../utils/menuItems";

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  const closeSidebar = () => setIsSidebarVisible(false);

  return (
    <>
      {/* Hamburger Menu (Visible only on small screens) */}
      <button
        className="lg:hidden fixed top-6 left-5 z-20 text-3xl text-textTertiary shrink-0"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-20 top-0 left-0 h-screen bg-primary lg:w-[20%] sm:w-[50%] w-[70%] transform transition-transform duration-300 ease-in-out 
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            className="text-textTertiary text-2xl"
            onClick={closeSidebar}
          >
            <IoClose />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="w-full h-full pt-8 pb-4">
          {/* Logo */}
          <div className="h-8 max-w-40 flex pl-5">
            <img
              src={logo}
              alt="Logo"
              height={"100%"}
              width={"100%"}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-4 mt-9 pl-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 transition duration-200 ease-in-out ${isActive
                    ? "text-green-100"
                    : "hover:text-green-100"
                  }`
                }
                onClick={closeSidebar} // Close sidebar on click
              >
                <div className="flex items-center gap-4">
                  <div className={`text-xl`}>{<item.icon />}</div>
                  <span
                    className={`text-xs ${item.path === location.pathname && "font-semibold"
                      }`}
                  >
                    {item.name}
                  </span>
                </div>
                <div
                  className={`w-2 h-6 rounded-l-md ${item.path === location.pathname
                    ? "bg-yellow-100"
                    : "border-textPrimary"
                    }`}
                />
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default memo(Sidebar);
