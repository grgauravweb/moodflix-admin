import React from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminNav from "../Components/Admin/AdminNav";
import MainDashboard from "../Components/Admin/MainDashboard";
import CountryManagement from "../Components/Admin/Pages/CountryManagement";
import AddMovies from "../Components/Admin/Pages/AddMovies/Addmovies";
import AllMovies from "../Components/Admin/Pages/AddMovies/AllMovies";
import AddTvSeries from "../Components/Admin/Pages/Tv_Series/AddTvSeries";
import AllTvSeries from "../Components/Admin/Pages/Tv_Series/AllTvSeries";
import AddTvChannel from "../Components/Admin/Pages/Tv_Channels/AddTvChannel";
import AllTvChannel from "../Components/Admin/Pages/Tv_Channels/AllTvChannel";
import Category from "../Components/Admin/Pages/Tv_Channels/Category";
import ProgramGuide from "../Components/Admin/Pages/Tv_Channels/ProgramGuide";
import Genre from "../Components/Admin/Pages/Genre/Genre";
import Slider from "../Components/Admin/Pages/Slider/Slider";
import SliderSetting from "../Components/Admin/Pages/Slider/SliderSetting";
import StarManagement from "../Components/Admin/Pages/ActorsDirectors/StarManagement";
import UserManagement from "../Components/Admin/Pages/User/UserManagement";
import MovieReq from "../Components/Admin/Pages/MovieRequest/MovieReq";
import Reports from "../Components/Admin/Pages/Reports/Reports";
import Package from "../Components/Admin/Pages/Subsctiption/Package";
import PaymentSetting from "../Components/Admin/Pages/Subsctiption/PaymentSetting";
import TransactionLog from "../Components/Admin/Pages/Subsctiption/TransactionLog";
import Setting from "../Components/Admin/Pages/Subsctiption/Setting";
import NotificationSetting from "../Components/Admin/Pages/Notification/Setting";
import LiveTvNotification from "../Components/Admin/Pages/Notification/LiveTv";
import SystemSetting from "../Components/Admin/Pages/Setting/SystemSetting";
import AndroidSetting from "../Components/Admin/Pages/Setting/AndroidSetting";
import EmailSetting from "../Components/Admin/Pages/Setting/EmailSetting";
import AdsSetting from "../Components/Admin/Pages/Setting/AdsSetting";
import TmdbSettings from "../Components/Admin/Pages/Setting/TmdbSettings";
import CronSetting from "../Components/Admin/Pages/Setting/CronSetting";
import ApiSetting from "../Components/Admin/Pages/Setting/ApiSetting";
import MovieVideoQuality from "../Components/Admin/Pages/Setting/MovieVideoQuality";
import CommentSetting from "../Components/Admin/Pages/Comments/CommentSetting";
import Comments from "../Components/Admin/Pages/Comments/Comments";
import SearchAndImport from "../Components/Admin/Pages/SearchImport/SearchAndImport";
import MovieScrapper from "../Components/Admin/Pages/MovieScrapper/MovieScrapper";
import PaymentQr from "../Components/Admin/Pages/PaymentQr/PaymentQr";
import { AddMoviesNew } from "../Components/Admin/Pages/AddMovies/AddMoviesNew";
import { AddTVSeriesNew } from "../Components/Admin/Pages/Tv_Series/AddTvSeriesNew";
import { AddTvSeriesEpisode } from "../Components/Admin/Pages/Tv_Series/AddTvSeriesEpisode";
import { AllTvSeriesNew } from "../Components/Admin/Pages/Tv_Series/AllTvSeriesNew";

const Dashboard = () => {
  // Use useLocation hook to get the current path dynamically
  const location = useLocation();
  const currentPath = location.pathname;

  // Conditionally render components based on the URL path
  const renderContent = () => {
    if (currentPath === "/admin/country") {
      return <CountryManagement />;
    } else if (currentPath === "/admin/dashboard") {
      return <MainDashboard />;
    } else if (currentPath === "/admin/add-movies") {
      return <AddMoviesNew />;
    } else if (currentPath === "/admin/add-moviess") {
      return <AddMovies />;
    } else if (currentPath === "/admin/all-movies") {
      return <AllMovies />;
    } else if (currentPath === "/admin/all-tv-seriesNew") {
      return <AllTvSeries />;
    } else if (currentPath === "/admin/all-tv-series") {
      return <AllTvSeriesNew />;
    } else if (currentPath === "/admin/add-tv-seriesNew") {
      return <AddTvSeries />;
    } else if (currentPath === "/admin/add-tv-series") {
      return <AddTVSeriesNew />;
    } else if (currentPath.startsWith("/admin/add-tv-seriesEp/")) {
      return <AddTvSeriesEpisode />;
    } else if (currentPath === "/admin/add-tv-channel") {
      return <AddTvChannel />;
    } else if (currentPath === "/admin/all-tv-channel") {
      return <AllTvChannel />
    } else if (currentPath === "/admin/category") {
      return <Category />
    } else if (currentPath === "/admin/program-guide") {
      return <ProgramGuide />
    } else if (currentPath === "/admin/genre") {
      return <Genre />
    } else if (currentPath === "/admin/image-slider") {
      return <Slider />
    } else if (currentPath === "/admin/slider-setting") {
      return <SliderSetting />
    } else if (currentPath === "/admin/actors-directors") {
      return <StarManagement />
    } else if (currentPath == "/admin/users") {
      return <UserManagement />
    } else if (currentPath === "/admin/movie-requests") {
      return <MovieReq />
    } else if (currentPath === "/admin/report") {
      return <Reports />
    } else if (currentPath === "/admin/subscription/package") {
      return <Package />
    } else if (currentPath === "/admin/subscription/payment-setting") {
      return <PaymentSetting />
    } else if (currentPath === "/admin/subscription/transaction-log") {
      return <TransactionLog />
    } else if (currentPath === "/admin/subscription/setting") {
      return <Setting />
    } else if (currentPath === "/admin/notification/setting") {
      return <NotificationSetting />
    } else if (currentPath === "/admin/notification/live-tv") {
      return <LiveTvNotification />
    } else if (currentPath === "/admin/system-settings") {
      return <SystemSetting />
    } else if (currentPath === "/admin/android-setting") {
      return <AndroidSetting />
    } else if (currentPath === "/admin/email-setting") {
      return <EmailSetting />
    } else if (currentPath === "/admin/ads-setting") {
      return <AdsSetting />
    } else if (currentPath === "/admin/tbdb-setting") {
      return <TmdbSettings />
    } else if (currentPath === "/admin/cron-setting") {
      return <CronSetting />
    } else if (currentPath === "/admin/api-setting") {
      return <ApiSetting />
    } else if (currentPath === "/admin/movie-video-quality") {
      return <MovieVideoQuality />
    } else if (currentPath === "/admin/comment-setting") {
      return <CommentSetting />
    } else if (currentPath === "/admin/comments") {
      return <Comments />
    } else if (currentPath === "/admin/search-import") {
      return <SearchAndImport />
    } else if (currentPath === "/admin/movie-scrapper") {
      return <MovieScrapper />
    } else if (currentPath === "/admin/Paymentqr") {
      return <PaymentQr />
    }

    else {
      return <MainDashboard />; // Default to MainDashboard for other paths
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <AdminNav />

      {/* Main Layout: Sidebar and Content */}
      <div className="flex min-h-screen bg-gray-100 no-scrollbar">
        {/* Sidebar */}
        <AdminSidebar className="bg-blue-900 text-white min-h-screen p-4" />

        {/* Main content area */}
        <div className="flex-1 p-6 ml-60 no-scrollbar">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
