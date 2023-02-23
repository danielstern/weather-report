import * as env from 'dotenv'
import axios, * as others from 'axios'
import express from 'express'
import cors from 'cors'
env.config()

// todo move spec to own file
const spec = [
  {
    "parameter": "t_2m:C",
    "coordinates": [
      {
        "lat": 52.520551,
        "lon": 13.461804,
        "dates": [
          {
            "date": "2023-02-22T00:00:00Z",
            "value": 5.7
          },
          {
            "date": "2023-02-22T01:00:00Z",
            "value": 4.9
          },
          {
            "date": "2023-02-22T02:00:00Z",
            "value": 4.7
          },
          {
            "date": "2023-02-22T03:00:00Z",
            "value": 4.4
          },
          {
            "date": "2023-02-22T04:00:00Z",
            "value": 3.8
          },
          {
            "date": "2023-02-22T05:00:00Z",
            "value": 3.9
          },
          {
            "date": "2023-02-22T06:00:00Z",
            "value": 4.1
          },
          {
            "date": "2023-02-22T07:00:00Z",
            "value": 4.6
          },
          {
            "date": "2023-02-22T08:00:00Z",
            "value": 6.2
          },
          {
            "date": "2023-02-22T09:00:00Z",
            "value": 7.8
          },
          {
            "date": "2023-02-22T10:00:00Z",
            "value": 8.6
          },
          {
            "date": "2023-02-22T11:00:00Z",
            "value": 9.2
          },
          {
            "date": "2023-02-22T12:00:00Z",
            "value": 9.8
          },
          {
            "date": "2023-02-22T13:00:00Z",
            "value": 9.8
          },
          {
            "date": "2023-02-22T14:00:00Z",
            "value": 9.9
          },
          {
            "date": "2023-02-22T15:00:00Z",
            "value": 9.5
          },
          {
            "date": "2023-02-22T16:00:00Z",
            "value": 8.8
          },
          {
            "date": "2023-02-22T17:00:00Z",
            "value": 7.9
          },
          {
            "date": "2023-02-22T18:00:00Z",
            "value": 7.4
          },
          {
            "date": "2023-02-22T19:00:00Z",
            "value": 6.5
          },
          {
            "date": "2023-02-22T20:00:00Z",
            "value": 5.9
          },
          {
            "date": "2023-02-22T21:00:00Z",
            "value": 5.4
          },
          {
            "date": "2023-02-22T22:00:00Z",
            "value": 5
          },
          {
            "date": "2023-02-22T23:00:00Z",
            "value": 4.7
          },
          {
            "date": "2023-02-23T00:00:00Z",
            "value": 4.5
          }
        ]
      }
    ]
  },
  {
    "parameter": "wind_speed_10m:ms",
    "coordinates": [
      {
        "lat": 52.520551,
        "lon": 13.461804,
        "dates": [
          {
            "date": "2023-02-22T00:00:00Z",
            "value": 0.7
          },
          {
            "date": "2023-02-22T01:00:00Z",
            "value": 1.7
          },
          {
            "date": "2023-02-22T02:00:00Z",
            "value": 1.9
          },
          {
            "date": "2023-02-22T03:00:00Z",
            "value": 2
          },
          {
            "date": "2023-02-22T04:00:00Z",
            "value": 2
          },
          {
            "date": "2023-02-22T05:00:00Z",
            "value": 1.7
          },
          {
            "date": "2023-02-22T06:00:00Z",
            "value": 1.6
          },
          {
            "date": "2023-02-22T07:00:00Z",
            "value": 1.9
          },
          {
            "date": "2023-02-22T08:00:00Z",
            "value": 2.3
          },
          {
            "date": "2023-02-22T09:00:00Z",
            "value": 2.3
          },
          {
            "date": "2023-02-22T10:00:00Z",
            "value": 3.1
          },
          {
            "date": "2023-02-22T11:00:00Z",
            "value": 3.5
          },
          {
            "date": "2023-02-22T12:00:00Z",
            "value": 3.4
          },
          {
            "date": "2023-02-22T13:00:00Z",
            "value": 3.2
          },
          {
            "date": "2023-02-22T14:00:00Z",
            "value": 3.2
          },
          {
            "date": "2023-02-22T15:00:00Z",
            "value": 3.6
          },
          {
            "date": "2023-02-22T16:00:00Z",
            "value": 3.8
          },
          {
            "date": "2023-02-22T17:00:00Z",
            "value": 4
          },
          {
            "date": "2023-02-22T18:00:00Z",
            "value": 4.2
          },
          {
            "date": "2023-02-22T19:00:00Z",
            "value": 4.1
          },
          {
            "date": "2023-02-22T20:00:00Z",
            "value": 4
          },
          {
            "date": "2023-02-22T21:00:00Z",
            "value": 4.2
          },
          {
            "date": "2023-02-22T22:00:00Z",
            "value": 4.3
          },
          {
            "date": "2023-02-22T23:00:00Z",
            "value": 4.3
          },
          {
            "date": "2023-02-23T00:00:00Z",
            "value": 4.4
          }
        ]
      }
    ]
  },
  {
    "parameter": "precip_1h:mm",
    "coordinates": [
      {
        "lat": 52.520551,
        "lon": 13.461804,
        "dates": [
          {
            "date": "2023-02-22T00:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T01:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T02:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T03:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T04:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T05:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T06:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T07:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T08:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T09:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T10:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T11:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T12:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T13:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T14:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T15:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T16:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T17:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T18:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T19:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T20:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T21:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T22:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-22T23:00:00Z",
            "value": 0
          },
          {
            "date": "2023-02-23T00:00:00Z",
            "value": 0
          }
        ]
      }
    ]
  }
]

// spec mode doesn't call the real API saving precious $$$s
const specMode = true

const auth = {
  username: process.env.METEOMATICS_USER,
  password: process.env.METEOMATICS_PASS
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
    const response = await axios.get(query, {auth})
    const payload = response.data.data
    console.info(JSON.stringify(payload,null,2))
    return payload

  } catch (e) {
    console.info("Couldn't contact meteomatics. Returning spec data.", e.message)
    return spec
  }
}

// fetchMeteomaticsData({})

const app = new express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.post('/', async (req,res) => {
  const { from, to, long, lat } = req.body
  const data =  await fetchMeteomaticsData(req.body)
  res.json(data)
})

app.listen(process.env.PORT || 7777, console.info(`Weather report backend is listening`))