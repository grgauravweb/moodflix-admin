import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/country" element={<Dashboard />} />
        <Route path="/admin/add-movies" element={<Dashboard />} />
        <Route path="/admin/all-movies" element={<Dashboard />} />

        {/* TV Series Routes */}
        <Route path="/admin/add-tv-series" element={<Dashboard />} />
        <Route path="/admin/all-tv-series" element={<Dashboard />} />

        {/* TV Channels Routes */}
        <Route path="/admin/add-tv-channel" element={<Dashboard />} />
        <Route path="/admin/all-tv-channel" element={<Dashboard />} />
        <Route path="/admin/program-guide" element={<Dashboard />} />
        <Route path="/admin/category" element={<Dashboard />} />


        {/* Genre */}
        <Route path="/admin/genre" element={<Dashboard />} />

        {/* Slider */}
        <Route path="/admin/image-slider" element={<Dashboard />} />
        <Route path="/admin/slider-setting" element={<Dashboard />} />


        {/* Actors/directos */}
        <Route path="/admin/actors-directors" element={<Dashboard />} />


        {/* User */}
        <Route path="/admin/users" element={<Dashboard />} />
        
        
        {/* Movie Request */}
        <Route path="/admin/movie-requests" element={<Dashboard />} />

        {/* Reports */}
        <Route path="/admin/report" element={<Dashboard />} />


        {/* Subscription */}
        <Route path="/admin/subscription/package" element={<Dashboard />} />
        <Route path="/admin/subscription/payment-setting" element={<Dashboard />} />
        <Route path="/admin/subscription/transaction-log" element={<Dashboard />} />
        <Route path="/admin/subscription/setting" element={<Dashboard />} />


        {/* Notificaton */}
        <Route path="/admin/notification/live-tv" element={<Dashboard />} />
        <Route path="/admin/notification/movie/series" element={<Dashboard />} />
        <Route path="/admin/notification/webview" element={<Dashboard />} />
        <Route path="/admin/notification/setting" element={<Dashboard />} />



        <Route path="admin/system-settings" element={<Dashboard />} />
        <Route path="/admin/api-setting" element={<Dashboard />} />
        <Route path="/admin/android-setting" element={<Dashboard />} />
        <Route path="/admin/email-setting" element={<Dashboard />} />
        <Route path="/admin/cron-setting" element={<Dashboard />} />
        <Route path="/admin/ads-setting" element={<Dashboard />} />
        <Route path="/admin/tbdb-setting" element={<Dashboard />} />
        <Route path="/admin/update" element={<Dashboard />} />
        <Route path="/admin/movie-video-quality" element={<Dashboard />} />




        {/* Comments */}
        <Route path="/admin/comments" element={<Dashboard />} />
        <Route path="admin/comment-setting" element={<Dashboard />} />

        {/* Search and Import */}
        <Route path="/admin/search-import" element={<Dashboard />} />

        {/* Movie Scrapper */}
        <Route path="/admin/movie-scrapper" element={<Dashboard />} />


        <Route path="/admin/Paymentqr" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
