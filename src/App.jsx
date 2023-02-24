import { useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MenuItem, Select, TextField } from '@mui/material';
import spec from './spec'
import moment from 'moment'
import Box from '@mui/material/Box';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel } from './mui/TabPanel'
import { TemperatureBarChart, PrecipitationChart } from './Charts'
import { fetchMeteomaticsData } from './network';


import cities from '../lib/cities copy.json'
import './App.css'
import '@fontsource/roboto/300.css'


function App() {

  const [from, setFrom] = useState("2023-02-23T00:00:00Z")
  const [to, setTo] = useState("2023-02-24T00:00:00Z")
  const [long, setLong] = useState(cities[0].longitude)
  const [lat, setLat] = useState(cities[0].latitude)
  const [data, setData] = useState(null)
  console.info(data)
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await fetchMeteomaticsData({ from, to, long, lat })
        setData(data)

      } catch (e) {

        const data = spec
        setData(data)

      }
    })()
  }, [from, to, long, lat])

  if (!data) {
    return <svg height="100" width="100" fill="dark gray"></svg>
  }

  const minDate = moment().subtract(12, 'hours').toDate()

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <h1>Weather Report</h1>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={<WbSunnyIcon sx={{fontSize:"48px"}}/>}/>
                <Tab label={<BeachAccessIcon sx={{fontSize:"48px"}}/>}  />
                {/* <Tab label={<WindPowerIcon/>}  /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TemperatureBarChart temperature={data[0].coordinates[0].dates.map(d => d.value)} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PrecipitationChart precipitation={data[0].coordinates[0].dates.map(d => d.value)}/>
            </TabPanel>
            {/* TODO: Add more panels! */}
            {/* <TabPanel value={value} index={2}>
              Wind
            </TabPanel> */}
          </Box>
        <div>
          <Select defaultValue={cities[0]} autoWidth={false} style={{width:"200px"}} onChange={(e) => {
            const { longitude, latitude } = e.target.value
            setLong(longitude)
            setLat(latitude)
          }}>
            {cities.map((city) => (
              <MenuItem key={city.name} value={city}>{city.name}</MenuItem>
            ))}
          </Select>
          <DatePicker
            label="From Date"
            minDate={minDate}
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
            minDate={minDate}
            maxDate={new Date()}
            onChange={(newValue) => {
              setTo(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default App
 