import * as d3 from 'd3'

/**
 * A flexible chart that displays an array of data as small blue raindrop-like circles
 */
export const PrecipitationChart = ({
  precipitation,
  minPrecipitation = -20,
  maxPrecipitation = 100,
  elementWidth = 1200,
  elementHeight = 600,
  l: length = precipitation.length,
  marginTop = 36,
  fontSize = 24,
  marginLeft = 60
}) => {

  const ySpaceAvailable = elementHeight - marginTop / 2
  const xSpaceAvailable = elementWidth - marginLeft / 2

  const scale = d3.scaleLinear()
    .domain([minPrecipitation, maxPrecipitation])
    .range([0, elementHeight])

  return <svg width="100%" viewBox={`0 0 ${elementWidth} ${elementHeight}`}>
    <g>
      {precipitation.map((_t,i)=>(
        <text
          x={marginLeft + (elementWidth - marginLeft * 2) / (length / i) + 8}
          y={elementHeight - 16}
          style={{ fontStyle: "italic", fontSize: fontSize * (9 / 11) }}
          fill="darkgray"
        >{i}H</text>
      ))}
    </g>
    <g >
      <text style={{ fontStyle: "italic", fontSize: fontSize * (16 / 11) }} textAnchor="start" letterSpacing="1" x={72} y={72} fill="darkgray">Precipitation</text>
    </g>
    <g>
      <rect stroke='#32393F' width={elementWidth - marginLeft * 2} height={elementHeight - marginTop * 2} fill="none" y={marginTop} x={marginLeft} />
      {precipitation.map((t, i) => (
        <circle
          key={i}
          r={12}
          cx={marginLeft + 24 + (elementWidth - marginLeft * 2) / (length / i)}
          cy={marginTop + elementHeight - scale(t)}
          fill="steelblue"
          stroke="indigo" />
      ))}
    </g>
    <g>
      {[`0mm`, `10mm`, `20mm`, `30mm`, `40mm`, `50mm`].reverse().map((a, i) => {

        const spacing = ySpaceAvailable / 5;

        return <g >
          <text style={{ fontStyle: "italic", fontSize: fontSize * (7 / 11) }} textAnchor="end" letterSpacing="1" x={marginLeft - 5} y={16 + marginTop + spacing * i} fill="darkgray">{a}</text>
        </g>
      })}
    </g>
    <g>
      {[0, 1, 2, 3, 4, 5].map((a, i) => {

        const spacing = ySpaceAvailable / 5;

        return <g >
          <rect height={1} width={xSpaceAvailable - 90} fill="darkgray" fillOpacity="100%" x={marginLeft} y={16 + marginTop + spacing * i}></rect>
        </g>
      })}
    </g>
  </svg>
}

/**
 * A chart displaying a series of semi-connected bars representing overall temperature
 */

export const TemperatureBarChart = ({
  temperature,
  minTemp = -50,
  maxTemp = 50,
  elementWidth = 1200,
  elementHeight = 600,
  l: length = temperature.length,
  barWidth = 1000 / length - 0,
  marginTop = 36,
  marginLeft = 36,
  fontSize = 24
}) => {

  const ySpaceAvailable = elementHeight - marginTop / 2
  const xSpaceAvailable = elementWidth - marginLeft / 2

  const scale = d3.scaleLinear()
    .domain([minTemp, maxTemp])
    .range([0, ySpaceAvailable])

  const color = d3.scaleLinear()
    .domain([minTemp, maxTemp])
    .range([d3.interpolateWarm(0), d3.interpolateWarm(1)])

  return <svg width="100%" viewBox={`0 0 ${elementWidth} ${elementHeight}`}>
    <g>
      {temperature.map((_t,i)=>(
        <text
          x={marginLeft + (elementWidth - marginLeft * 2) / (length / i) + 8}
          y={elementHeight - 16}
          style={{ fontStyle: "italic", fontSize: fontSize * (9 / 11) }}
          fill="darkgray"
        >{i}H</text>
      ))}
    </g>
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a, i) => {

        const spacing = ySpaceAvailable / 10;

        return <g >
          <rect height={1} width={xSpaceAvailable - 54} fill="darkgray" fillOpacity="50%" x={marginLeft} y={8 + marginTop + spacing * i }></rect>
        </g>
      })}
    </g>
    <g >
      <text style={{ fontStyle: "italic", fontSize: fontSize * (16 / 11) }} textAnchor="start" letterSpacing="1" x={46} y={72} fill="darkgray">Temperature</text>
    </g>
    <g>
      <rect stroke='#32393F' width={elementWidth - marginLeft * 2} height={elementHeight - marginTop * 2} fill="none" y={marginTop} x={marginLeft} />
      {temperature.map((t, i) => (
        <rect
          key={i}
          height={scale(t)}
          rx={3}
          width={barWidth}
          x={marginLeft + (elementWidth - marginLeft * 2) / (length / i)}
          y={ySpaceAvailable - scale(t) - marginTop / 2}
          fill={color(t)} />
      ))}
    </g>
    <g>
      {[-40, -30, -20, -10, 0, 10, 20, 30, 40, 50].sort((a, b) => b - a).map((a, i) => {

        const spacing = ySpaceAvailable / 10;

        return <g >
          <text style={{ fontStyle: "italic", fontSize: fontSize * (9 / 11) }} textAnchor="end" letterSpacing="1" x={marginLeft - 5} y={16 + marginTop + spacing * i} fill="darkgray">{a}</text>
        </g>
      })}
    </g>
  </svg>
}
