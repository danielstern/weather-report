import { useEffect, useState } from 'react'
import axios, * as others from 'axios'
import * as d3 from 'd3'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MenuItem, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import spec from './spec'
import Box from '@mui/material/Box';
import './App.css'
import '@fontsource/roboto/300.css'
import moment from 'moment'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import WindPowerIcon from '@mui/icons-material/WindPower';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const fetchMeteomaticsData = async (options) => await axios.post(`http://localhost:7777/`, options)

const PrecipitationChart = ({
  precipitation,
  minPrecipitation = -20,
  maxPrecipitation = 100,
  elementWidth = 1200,
  elementHeight = 600,
  l: length = precipitation.length,
  marginTop = 36,
  fontSize = 24,
  margin = 36
}) => {

  const scale = d3.scaleLinear()
    .domain([minPrecipitation, maxPrecipitation])
    .range([0, elementHeight])

    return <svg width="100%" viewBox={`0 0 ${elementWidth} ${elementHeight}`}>
    <g>
      <rect stroke='#32393F' width={elementWidth - margin * 2} height={elementHeight - marginTop * 2} fill="none"  y={marginTop} x={margin}/>
      {precipitation.map((t, i) => (
        <circle
          key={i}
          r={12}
          cx={margin + 24 + (elementWidth - margin * 2) / (length / i)}
          cy={marginTop + elementHeight - scale(t)}
          fill="steelblue"
          stroke="indigo" />
      ))}
    </g>
   
  </svg>

}
const TemperatureBarChart = ({
  temperature,
  minTemp = -40,
  maxTemp = 50,
  elementWidth = 1200,
  elementHeight = 600,
  l: length = temperature.length,
  barWidth = 1000 / length - 0,
  marginTop = 36,
  fontSize = 24,
  margin = 36
}) => {

  const scale = d3.scaleLinear()
    .domain([minTemp, maxTemp])
    .range([0, elementHeight])


  const color = d3.scaleLinear()
    .domain([minTemp, maxTemp])
    .range([d3.interpolateWarm(0),d3.interpolateWarm(1)])
  return <svg width="100%" viewBox={`0 0 ${elementWidth} ${elementHeight}`}>
    <g>
      <rect stroke='#32393F' width={elementWidth - margin * 2} height={elementHeight - marginTop * 2} fill="none"  y={marginTop} x={margin}/>
      {temperature.map((t, i) => (
        <rect
          key={i}
          height={scale(t) - margin}
          rx={3}
          width={barWidth}
          x={margin + (elementWidth - margin * 2) / (length / i)}
          y={elementHeight - scale(t)}
          fill={color(t)}
          stroke="none" />
      ))}
    </g>
    <g Left Side Legend>
			{[-40,-30,-20,-10,0,10,20,30,40,50].sort((a,b)=>b-a).map((a,i) =>{

				const spaceAvailable = elementHeight - 60;
				const spacing = spaceAvailable / 10;

				return <g >
					<text style={{fontStyle:"italic",fontSize : fontSize * (9 / 11)}} textAnchor="end" letterSpacing="1" x={margin -10} y={36 + marginTop + spacing * i} fill="darkgray">{a}</text>	
				</g>
				
			})}
		</g>
  </svg>
}

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

import cities from '../lib/cities copy.json' 