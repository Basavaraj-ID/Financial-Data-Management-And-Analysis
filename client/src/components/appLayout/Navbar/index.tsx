import { IoNotificationsOutline } from "react-icons/io5";
import profilePicture from "/images/profileImage.png";
import Search from "../../shared/Search";
import { memo, useState } from "react";
import { useLocation } from "react-router-dom";

const  Navbar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const location = useLocation();

  const formattedPathname = location.pathname
    .replace("/", "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="flex justify-between items-center gap-4 bg-primary h-20 w-full px-6 sticky">
      <h1 className="text-textTertiary font-semibold text-xl pl-10 lg:pl-0">{formattedPathname}</h1>
      <div className="flex justify-between items-center gap-4">
        <div className="lg:max-w-60 hidden lg:block">
          <Search value={searchText} onChange={setSearchText} />
        </div>
        <div className="flex items-center gap-5 mr-2">
          <IoNotificationsOutline className="text-2xl" />
          <img src={profilePicture} alt="User Profile" />
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
