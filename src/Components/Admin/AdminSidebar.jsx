import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaFilm,
  FaTv,
  FaRegNewspaper,
  FaSlidersH,
  FaComments,
  FaCog,
  FaBell,
  FaUsers,
  FaFileAlt,
  FaHome,
  FaBoxOpen,
  FaHistory,
} from "react-icons/fa";
import {
  BsQrCode
} from "react-icons/bs";
import {
  MdOutlineViewAgenda,
  MdPlace
} from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { VscRequestChanges } from "react-icons/vsc";
import { CiMoneyBill, CiCircleMinus } from "react-icons/ci";
import { IoAdd, IoTvSharp } from "react-icons/io5";
import { GiCardPickup } from "react-icons/gi";
import { FiCreditCard } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [dropdowns, setDropdowns] = useState({});
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: FaHome, route: "/admin/dashboard" },
    { name: "Search & Import", icon: FaSearch, route: "/admin/search-import" },
    { name: "Movie Scrapper", icon: GiCardPickup, route: "/admin/movie-scrapper" },
    { name: "Country", icon: MdPlace, route: "/admin/country" },
    { name: "Genre", icon: MdOutlineViewAgenda, route: "/admin/genre" },
    { name: "Payment QR", icon: BsQrCode, route: "/admin/Paymentqr" },
    { name: "Actor / Director", icon: FaUsers, route: "/admin/actors-directors" },
    { name: "Users", icon: FaUsers, route: "/admin/users" },
    { name: "Movie Request", icon: VscRequestChanges, route: "/admin/movie-requests" },
    { name: "Report", icon: BiSolidReport, route: "/admin/report" },
  ];

  const dropdownMenus = [
    {
      key: "movies",
      title: "Movies",
      icon: FaFilm,
      options: ["ADD MOVIES", "ALL MOVIES"],
    },
    {
      key: "tvSeries",
      title: "TV Series",
      icon: FaTv,
      options: ["ADD TV SERIES", "ALL TV SERIES"],
    },
    {
      key: "tvChannels",
      title: "TV Channels",
      icon: IoTvSharp,
      options: ["ADD TV CHANNEL", "ALL TV CHANNEL", "PROGRAM GUIDE", "CATEGORY"],
    },
    {
      key: "slider",
      title: "Slider",
      icon: FaSlidersH,
      options: ["IMAGE SLIDER", "SLIDER SETTING"],
    },
    {
      key: "comments",
      title: "Comments",
      icon: FaComments,
      options: ["COMMENTS", "COMMENT SETTING"],
    },
    {
      key: "subscription",
      title: "Subscription",
      icon: CiMoneyBill,
      options: [
        { label: "PACKAGE", icon: FaBoxOpen },
        { label: "PAYMENT SETTING", icon: FiCreditCard },
        { label: "TRANSACTION LOG", icon: FaHistory },
        { label: "SETTING", icon: AiOutlineSetting },
      ],
    },
    {
      key: "notification",
      title: "Notification",
      icon: FaBell,
      options: ["LIVE TV", "SETTING"],
    },
    {
      key: "settings",
      title: "Settings",
      icon: FaCog,
      options: [
        "SYSTEM SETTINGS", "API SETTING", "ANDROID SETTING", "EMAIL SETTING",
        "MOVIE-VIDEO QUALITY", "CRON SETTING", "ADS SETTING", "TBDB SETTING",
      ],
    },
  ];

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed pt-24 bg-gray-800 h-screen w-64 p-2 overflow-y-auto transition-all duration-300 ease-in-out no-scrollbar">
      <ul className="text-white space-y-1">
        {menuItems.map(({ name, icon: Icon, route }) => (
          <li
            key={name}
            onClick={() => navigate(route)}
            className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
          >
            <Icon className="mr-2" /> {name}
          </li>
        ))}

        {dropdownMenus.map(({ key, title, icon: Icon, options }) => (
          <React.Fragment key={key}>
            <li
              className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
              onClick={() => toggleDropdown(key)}
            >
              <div className="flex items-center">
                <Icon className="mr-3" /> {title}
              </div>
              {dropdowns[key] ? <FaChevronDown /> : <FaChevronRight />}
            </li>
            {dropdowns[key] && (
              <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
                {options.map((option, index) => {
                  const isObject = typeof option === "object";
                  const label = isObject ? option.label : option;
                  const IconComponent = isObject ? option.icon : Icon;
                  const route = label.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <li
                      key={index}
                      onClick={() => navigate(`/admin/${route}`)}
                      className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center cursor-pointer"
                    >
                      <IconComponent className="mr-2" /> {label}
                    </li>
                  );
                })}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
