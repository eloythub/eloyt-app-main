export default {
  WEBSITE_BASE_URL: 'https://eloyt.com',
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: {
    "development": "https://staging-api.eloyt.com",
    "staging": "https://staging-api.eloyt.com",
    "production": "https://staging-api.eloyt.com" // TODO: change to "https://api.eloyt.com"
  },
  COM_BASE_URL: {
    "development": "https://staging-com.eloyt.com",
    "staging": "https://staging-com.eloyt.com",
    "production": "https://staging-com.eloyt.com" // TODO: change to "https://com.eloyt.com"
  },
  GPS_OPTIONS: {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  }
}
