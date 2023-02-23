// export function BarChart({ data }) {

//   const margin = { top: 0, right: 0, bottom: 0, left: 0 };
//   const width = 500 - margin.left - margin.right;
//   const height = 300 - margin.top - margin.bottom;

//   const scaleX = scaleBand()
//     // .domain(data.map(({ label }) => label))
//     .domain(data)
//     .range([0, width]);
//   return (
    
//     <svg
//       width={width + margin.left + margin.right}
//       height={height + margin.top + margin.bottom}>
//       <g transform={`translate(${margin.left}, ${margin.top})`}></g>
//     </svg>
//   );

// }

import React from 'react'
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   data : props.data
    // };
  }

  render() {
    // const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={this.props.data} >
          {/* <ArgumentAxis /> */}
          {/* <ValueAxis max={7} /> */}

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
