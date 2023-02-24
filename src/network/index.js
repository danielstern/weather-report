import axios from 'axios'
/**
 * Fetches meteomatics data from the Custom API wrapper we built
 * Meteomatics doesn't allow cross origin requests - the request to their API must be from a server
 * But our wrapper at heroku does not have that limitation
 */
export const fetchMeteomaticsData = async (options) => await axios.post(`https://meteorics-api-wrapper.herokuapp.com/`, options)
