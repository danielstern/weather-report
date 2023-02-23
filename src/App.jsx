import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios, * as others from 'axios'

import cities from '../lib/cities.json' 
import '@fontsource/roboto/300.css'

import Button from '@mui/material/Button';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { adaptV4Theme, MenuItem, Select, TextField } from '@mui/material';
import { BarChart } from './Charts/Bar'
// import spec from '../lib/spec.json' assert { type : 'json'}
import spec from './spec2'

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

const fetchMeteomaticsData = async (options) => await axios.post(`http://localhost:7777/`, options)

function App() {

  const [from, setFrom] = useState("2023-02-22T00:00:00Z")
  const [to, setTo] = useState("2023-02-23T00:00:00Z")
  const [long, setLong] = useState(52)
  const [lat, setLat] = useState(12)
  const [data, setData] = useState({})
  console.info(data)

  useEffect(() => {
    (async function () {
      try {
        const { data } = await fetchMeteomaticsData({ from, to, long, lat })
        setData(data)

      } catch (e) {
        
        const data = spec
        setData(data)

      }
      // console.info(data)
    })()
  }, [from, to, long, lat])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <h1>Weather Report</h1>
        <div>
          <Select defaultValue={cities[0]} autoWidth={false} onChange={({longitude, latitude})=>{
            setLong(longitude)
            setLat(latitude)
          }}>
            {cities.map((city)=>(
              <MenuItem key={city.name} value={city}>{city.name}</MenuItem>
            ))}
          </Select>
          <DatePicker
            label="From Date"
            minDate="2023-02-22T00:00:00Z"
            maxDate={new Date()}
            value={from}
            onChange={(newValue) => {
              setFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To Date"
            value={to}
            minDate="2023-02-22T00:00:00Z"
            maxDate={new Date()}
            onChange={(newValue) => {
              setTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default App
