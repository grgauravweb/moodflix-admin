// src/config/globalApi.js



const BASE_URL = 'https://api-3q7fb.ondigitalocean.app/api';
const BASE_URL2 = 'http://localhost:5000/api';

export const API_URLS = {


  login: `${BASE_URL}/auth/login`,
  Forget: `${BASE_URL}/auth/reset-password`,
  users: `${BASE_URL}/users`,

  //////////////////////////////////////////  
  MainDashboard: `${BASE_URL}`,
  ////////////////////////////////////////////  

  auth: `${BASE_URL}/auth`,



  //// ADD MOVIES //////////////////////////
  AddMovies: `${BASE_URL}/movies`,

  ////////TV SERIES ////////////////////
  AddTvSeries: `${BASE_URL}/tvseries`,
  AddTvSeriesep: `${BASE_URL}/tvseries`,
  AllTvSeries: `${BASE_URL}/tvseries`,
  EditTvSeries: `${BASE_URL}/tvseries`,


  ///////////////// TV CHANNEL ////////////////////////////////////

  ProgramGuide: `${BASE_URL}/ProgramGuide`,
  programs: `${BASE_URL}/ProgramGuide`,
  categories: `${BASE_URL}/categories`,
  tvchannels: `${BASE_URL}/tvchannels`,
  editTvChannels: `${BASE_URL}/tvchannels`,



  //////// SEARCHES AND IMPORTS ////////////
  SearchMovie: `${BASE_URL}/movies`,


  ///////////////MOVIE SCRAPPER/////////////////////

  MovieScraper: `${BASE_URL}/movies`,


  //////////// COUNTRY MANAGEMENT  ////////////////////  
  country: `${BASE_URL}/countries`,


  ///////////////// PAYMENT QR ///////////////////////// 
  paymentQr: `${BASE_URL}/payment-qr`,


  ////////////////     SLIDER       //////////////////////////////
  slider: `${BASE_URL}/sliders`,
  slidersetting: `${BASE_URL}/slider-settings`,


  ////// COMMENT /////////////////////
  comment: `${BASE_URL}/comments`,
  setting: `${BASE_URL}/commentSetting`,


  ///////// MOVIE REQ ////////////////
  movieRequests: `${BASE_URL}/movie-requests`,


  //////////// REPORTS //////////////////
  reports: `${BASE_URL}/reports`,




  packages: `${BASE_URL}/packages`,
  paymentSettings: `${BASE_URL}/payment-settings`,
  transactions: `${BASE_URL}/transactions`,
  SubSettings: `${BASE_URL}/settings`,


  ////////////// notifications //////////////////////
  notifications: `${BASE_URL}/notifications`,
  PushNotificationSetting: `${BASE_URL}/push-notification-settings`,




  /////////////// SETTING /////////////////////
  Settinglatest: `${BASE_URL}/system-settings/Settinglatest`,
  systemsettings: `${BASE_URL}/system-settings`,
  apiSettings: `${BASE_URL}/api-settings`,
  androidSettings: `${BASE_URL}/android-settings`,
  emailSettings: `${BASE_URL}/email-settings`,
  videoQualities: `${BASE_URL}/videoQualities`,
  videoQualities: `${BASE_URL}/videoQualities`,
  cronSettings: `${BASE_URL}/cron-settings`,
  adsSettings: `${BASE_URL}/ads-settings`,
  tmdbSettings: `${BASE_URL}/tmdb-settings`,

  ///// GENRE ////////////
  genre: `${BASE_URL}/genres`,
  // SLIDER ///////



  ///ACTORS/DIRECTORS///////
  getStars: `${BASE_URL}/stars`,
  getActor: `${BASE_URL}/stars/Actor`,
  getDirector: `${BASE_URL}/stars/Director`,
  getWriter: `${BASE_URL}/stars/Writer`,
  saveStar: `${BASE_URL}/stars`,


  //User managemnet////
  users: `${BASE_URL}/users`,




  //Tv channel//
  tvchannel: `${BASE_URL}/tvChannels`,


  //// CRONS//// 
  cronsSetting: `${BASE_URL}/cron-settings`

};
