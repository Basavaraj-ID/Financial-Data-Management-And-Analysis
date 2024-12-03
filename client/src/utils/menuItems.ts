/** @format */

import { FaRegEnvelope } from "react-icons/fa";
import { RiDashboardFill, RiUserLine, RiWallet3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPresentationAnalytics } from "react-icons/tb";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: RiDashboardFill },
  { name: "Transactions", path: "/transactions", icon: RiWallet3Line },
  { name: "Analytics", path: "/analytics", icon: TbPresentationAnalytics },
  { name: "Personal", path: "/personal", icon: RiUserLine },
  { name: "Messages", path: "/message", icon: FaRegEnvelope },
  { name: "Settings", path: "/setting", icon: IoSettingsOutline },
];

export default menuItems;
