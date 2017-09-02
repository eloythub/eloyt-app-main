export default {
  WEBSITE_BASE_URL: 'https://eloyt.com',
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: {
    "development": "https://staging-api.eloyt.com",
    "staging": "https://staging-api.eloyt.com",
    "production": "https://staging-api.eloyt.com" // TODO: change to "https://api.eloyt.com"
  }
}
