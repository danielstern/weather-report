import * as env from 'dotenv'
import axios, * as others from 'axios'
import express from 'express'
import cors from 'cors'
import { writeFileSync } from 'fs'
env.config()

const auth = {
  username: process.env.METEOMATICS_USER || "icpllc_stern",
  password: process.env.METEOMATICS_PASS || "S9N8y9dN6m"
}

// METEOMATICS_USER=icpllc_stern
// METEOMATICS_PASS=S9N8y9dN6m
/**
 * About the Server
 * 
 * Meteomatics has a cross-origin policy which disallows making a query from the browser
 * So we need to route the query though a simple express server
 * 
 * So the flow is browser -> our server -> meteomatics -> our server -> browser
 * 
 */
// example working url:
// https://api.meteomatics.com/2023-02-22T00:00:00Z--2023-02-23T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json
async function fetchMeteomaticsData({
  from = `2023-02-22T00:00:00Z`, 
  to = `2023-02-23T00:00:00Z`, 
  long = `52.520551`, 
  lat = `13.461804`,
}) {
  if (specMode) return spec
  try {
    const query = `https://api.meteomatics.com/${from}--${to}:PT1H/t_2m:C,wind_speed_10m:ms,precip_1h:mm/${long},${lat}/json`
    console.table({query})
    const response = await axios.get(query, {auth})
    const payload = response.data.data
    return payload

  } catch (e) {
    console.info("Couldn't contact meteomatics. Returning spec data.", e)
    throw new Error()
  }
}

const app = new express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.post('/', async (req,res) => {
  try {
    const data =  await fetchMeteomaticsData(req.body)
    writeFileSync(`lib/${req.body.long}-${req.body.lat}.json`, JSON.stringify(data, null, 2))
    res.json(data)

  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

app.listen(process.env.PORT || 7777, console.info(`Weather report backend is listening`))