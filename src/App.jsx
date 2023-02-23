import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios, * as others from 'axios'
import {Chart as ChartJS} from 'chart.js/auto'
import {
  // Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
// import faker from 'faker'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4,5,6,7,8,9,10,11,12],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1,2,3,4,5,6,7,8,9,10,11,12],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


import cities from '../lib/cities.json' 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import * as env from 'dotenv'
import Button from '@mui/material/Button';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { adaptV4Theme, MenuItem, Select, TextField } from '@mui/material';
// import LocationPicker from 'react-location-picker';
import { BarChart } from './Charts/Bar'

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

const data_url = `http://localhost:7777/`

const fetchMeteomaticsData = async (options) => await axios.post(data_url, options)

function App() {

  const [from, setFrom] = useState("2023-02-22T00:00:00Z")
  const [to, setTo] = useState("2023-02-23T00:00:00Z")
  const [long, setLong] = useState(52)
  const [lat, setLat] = useState(12)
  const [data, setData] = useState({})

  useEffect(() => {
    (async function () {
      const { data } = await fetchMeteomaticsData({ from, to, long, lat })
      setData(data)
    })()
  }, [from, to, long, lat])
  console.info(data)
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <h1>Weather Report</h1>
        <div>
          {/* <Button variant="contained">Text</Button> */}
          {/* <pre> */}

          {/* {JSON.stringify(data,null,2)} */}
          {/* </pre> */}
        </div>
        <div>
          {/* <LocationPicker
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '400px'} } /> }
            defaultPosition={defaultPosition}
            onChange={(d) =>console.info(d)} /> */}
        </div>
        <div>
          <Select defaultValue={cities[0]} autoWidth={false} onChange={({longitude, latitude})=>{
            setLong(longitude)
            setLat(latitude)
          }}>
            {cities.map((city)=>(
              <MenuItem key={city.name} value={city}>{city.name}</MenuItem>
            ))}
          </Select>
          {/* <DatePicker /> */}
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
          {/* <input type="date"  /> */}
        </div>
        {/* <div>
          <BarChart data={[1,2,3,4]}/>
        </div> */}
        {/* <Line options={options} data={data} /> */}
        {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </div>
    </LocalizationProvider>
  )
}

export default App
