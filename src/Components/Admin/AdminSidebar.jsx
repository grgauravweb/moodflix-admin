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
} from "react-icons/fa";

import { BsQrCode } from "react-icons/bs";
import { MdOutlineViewAgenda } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { VscRequestChanges } from "react-icons/vsc";
import { CiMoneyBill } from "react-icons/ci";

import { IoAdd } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { GiCardPickup } from "react-icons/gi";

import { FaBoxOpen } from "react-icons/fa"; // New package icon
import { FiCreditCard } from "react-icons/fi"; // New payment setting icon
import { FaHistory } from "react-icons/fa"; // New transaction log icon
import { AiOutlineSetting } from "react-icons/ai"; // New settings icon


import { IoTvSharp } from 'react-icons/io5'; // Modern TV icon

import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [dropdowns, setDropdowns] = useState({
    movies: false,
    tvSeries: false,
    tvChannels: false,
    slider: false,
    comments: false,
    settings: false,
    subscription: false,
    notification: false,
  });

  const navigate = useNavigate(); // React Router hook for navigation

  const dummyOptions = {
    movies: ["ADD MOVIES", "ALL MOVIES"],
    tvSeries: ["ADD TV SERIES", "ALL TV SERIES"],
    tvChannels: [
      "ADD TV CHANNEL",
      "ALL TV CHANNEL",
      "PROGRAM GUIDE",
      "CATEGORY",
    ],
    slider: ["IMAGE SLIDER", "SLIDER SETTING"],
    comments: ["COMMENTS", "COMMENT SETTING"],
    settings: [
      "SYSTEM SETTINGS",
      "API SETTING",
      "ANDROID SETTING",
      "EMAIL SETTING",
      "MOVIE-VIDEO QUALITY",
      "CRON SETTING",
      "ADS SETTING",
      "TBDB SETTING",
    ],
    subscription: ["PACKAGE", "PAYMENT SETTING", "TRANSACTION LOG", "SETTING"],
    notification: ["LIVE TV", "SETTING"],
  };

  const toggleDropdown = (option) => {
    setDropdowns((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="fixed pt-24 bg-gray-800 h-screen w-64 p-2 overflow-y-auto transition-all duration-300 ease-in-out no-scrollbar">
      <ul className="text-white space-y-1">
        {/* Dashboard */}
        <li
          onClick={() => navigate("/admin/dashboard")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <FaHome className="mr-2" /> Dashboard
        </li>

        {/* Movies */}

        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("movies")}
        >
          <div className="flex items-center">
            <FaFilm className="mr-3" /> Movies
          </div>
          {dropdowns.movies ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.movies && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.movies.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  const route = option.toLowerCase().replace(/\s+/g, "-");
                  navigate(`/admin/${route}`);
                }}
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                {/* Conditionally render icons */}
                {index === 0 ? (
                  <IoAdd className="mr-2" />
                ) : index === 1 ? (
                  <CiCircleMinus className="mr-2" />
                ) : (
                  <FaFilm className="mr-2" />
                )}
                {option}
              </li>
            ))}
          </ul>
        )}

        {/* tv series */}

        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("tvSeries")}
        >
          <div className="flex items-center">
            <FaTv className="mr-3" /> TV Series
          </div>
          {dropdowns.tvSeries ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.tvSeries && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.tvSeries.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  const route = option.toLowerCase().replace(/\s+/g, "-"); // 'ADD TV SERIES' -> 'add-tv-series'
                  navigate(`/admin/${route}`); // Navigate to `/admin/add-tv-series` or `/admin/all-tv-series`
                }}
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                {/* Conditionally render icons */}
                {index === 0 ? (
                  <IoAdd className="mr-2" />
                ) : index === 1 ? (
                  <CiCircleMinus className="mr-2" />
                ) : (
                  <FaTv className="mr-2" />
                )}
                {option}
              </li>
            ))}
          </ul>
        )}

<>
  {/* TV Channels */}
  <li
    className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
    onClick={() => toggleDropdown("tvChannels")}
  >
    <div className="flex items-center">
      <FaTv className="mr-3" /> TV Channels
    </div>
    {dropdowns.tvChannels ? <FaChevronDown />  : <FaChevronRight />}
  </li>

  {dropdowns.tvChannels && (
    <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
      {dummyOptions.tvChannels.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            const route = option.toLowerCase().replace(/\s+/g, "-"); // 'ADD TV CHANNEL' -> 'add-tv-channel'
            navigate(`/admin/${route}`); // Navigate to `/admin/add-tv-channel` or `/admin/all-tv-channel`
          }}
          className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
        >
          {/* Conditionally render icons */}
          {index === 0 ? (
            <IoAdd className="mr-2" />
          ) : index === 1 ? (
            <CiCircleMinus className="mr-2" />
          ) : (
            <FaTv className="mr-2" />
          )}
          {option}
        </li>
      ))}
    </ul>
  )}
</>


        {/* Search & Import */}
        <li
          onClick={() => navigate("/admin/search-import")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <FaSearch className="mr-3" /> Search & Import
        </li>

        {/* Movie Scrapper */}
        <li
          onClick={() => navigate("/admin/movie-scrapper")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <GiCardPickup className="mr-3" /> Movie Scrapper
        </li>

        {/* Country */}
        <li
          onClick={() => navigate("/admin/country")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <MdPlace className="mr-3" /> Country
        </li>

        {/* Genre */}
        <li
          onClick={() => navigate("/admin/genre")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <MdOutlineViewAgenda className="mr-3" /> Genre
        </li>
        <li
          onClick={() => navigate("/admin/Paymentqr")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <BsQrCode className="mr-3" /> Payment QR
        </li>

        {/* Slider */}
        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("slider")}
        >
          <div className="flex items-center">
            <FaSlidersH className="mr-3" /> Slider
          </div>
          {dropdowns.slider ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.slider && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.slider.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  const route = option.toLowerCase().replace(/\s+/g, "-"); // 'ADD TV SERIES' -> 'add-tv-series'
                  navigate(`/admin/${route}`); // Navigate to `/admin/add-tv-series` or `/admin/all-tv-series`
                }}
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                <FaSlidersH className="mr-2" /> {option}
              </li>
            ))}
          </ul>
        )}

        {/* Comments */}
        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("comments")}
        >
          <div className="flex items-center">
            <FaComments className="mr-3" /> Comments
          </div>
          {dropdowns.comments ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.comments && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.comments.map((option, index) => (
              <li
                key={index}
                onClick={() =>
                  navigate(`/admin/${option.toLowerCase().replace(" ", "-")}`)
                }
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                <FaComments className="mr-2" /> {option}
              </li>
            ))}
          </ul>
        )}

        {/* Actor / Director */}
        <li
          onClick={() => navigate("/admin/actors-directors")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <FaUsers className="mr-3" /> Actor / Director
        </li>

        {/* Users */}
        <li
          onClick={() => navigate("/admin/users")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <FaUsers className="mr-3" /> Users
        </li>

        {/* Movie Request */}
        <li
          onClick={() => navigate("/admin/movie-requests")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <VscRequestChanges className="mr-3" /> Movie Request
        </li>

        {/* Report */}
        <li
          onClick={() => navigate("/admin/report")}
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out flex items-center"
        >
          <BiSolidReport className="mr-3" /> Report
        </li>

        {/* Subscription */}
        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("subscription")}
        >
          <div className="flex items-center">
            <CiMoneyBill className="mr-3" /> Subscription
          </div>
          {dropdowns.subscription ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.subscription && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.subscription.map((option, index) => {
              let Icon;
              switch (option) {
                case "PACKAGE":
                  Icon = FaBoxOpen; // Package icon
                  break;
                case "PAYMENT SETTING":
                  Icon = FiCreditCard; // Payment setting icon
                  break;
                case "TRANSACTION LOG":
                  Icon = FaHistory; // Transaction log icon
                  break;
                case "SETTING":
                  Icon = AiOutlineSetting; // Setting icon
                  break;
                default:
                  Icon = FaFileAlt;
                  break;
              }
              return (
                <li
                  key={index}
                  onClick={() =>
                    navigate(
                      `/admin/subscription/${option
                        .toLowerCase()
                        .replace(" ", "-")}`
                    )
                  }
                  className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
                >
                  <Icon className="mr-2" /> {option}
                </li>
              );
            })}
          </ul>
        )}

        {/* Notification */}
        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("notification")}
        >
          <div className="flex items-center">
            <FaBell className="mr-3" /> Notification
          </div>
          {dropdowns.notification ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.notification && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.notification.map((option, index) => (
              <li
                key={index}
                onClick={() =>
                  navigate(
                    `/admin/notification/${option
                      .toLowerCase()
                      .replace(" ", "-")}`
                  )
                }
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                <FaBell className="mr-2" /> {option}
              </li>
            ))}
          </ul>
        )}

        {/* Settings */}
        <li
          className="py-3 px-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out"
          onClick={() => toggleDropdown("settings")}
        >
          <div className="flex items-center">
            <FaCog className="mr-3" /> Settings
          </div>
          {dropdowns.settings ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {dropdowns.settings && (
          <ul className="pl-8 overflow-hidden transition-all duration-300 ease-in-out">
            {dummyOptions.settings.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  const route = option.toLowerCase().replace(/\s+/g, "-"); // 'ADD TV SERIES' -> 'add-tv-series'
                  navigate(`/admin/${route}`); // Navigate to `/admin/add-tv-series` or `/admin/all-tv-series`
                }}
                className="py-2 px-4 hover:bg-gray-600 transition-all duration-200 ease-in-out flex items-center"
              >
                <FaCog className="mr-2" /> {option}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default AdminSidebar;
