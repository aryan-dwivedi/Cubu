import React from 'react';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

const Earnings = () => {
  const data = [
    { label: 'JAN', value: 1500 },
    { label: 'FEB', value: 2800 },
    { label: 'MAR', value: 1700 },
    { label: 'APR', value: 2700 },
    { label: 'MAY', value: 1700 },
    { label: 'JUN', value: 1200 },
    { label: 'JUL', value: 700 },
    { label: 'AUG', value: 1500 },
    { label: 'SEP', value: 2300 },
    { label: 'OCT', value: 1000 },
    { label: 'NOV', value: 900 },
    { label: 'DEC', value: 2000 },
  ];

  const barData = [
    {
      data: data,
      svg: {
        fill: 'rgba(134, 65, 244,0.8)',
      },
    },
  ];

  return (
    <>        
        <BarChart
          style={{ height: 300, marginTop: 20, marginHorizontal: 10 }}
          data={barData}
          yAccessor={({ item }) => item.value}
          formatLabel={(item) => item}
          contentInset={{ top: 10, bottom: 10 }}
          yMin={0}
          yMax={5000}
          spacingInner={0.1}
          spacingOuter={0.1}
          {...this.props}>
          <Grid />
        </BarChart>
        <XAxis
          data={barData}
          svg={{
            fill: 'black',
            fontSize: 12,
            fontWeight: 'bold',
          }}
          xAccessor={({ item }) => item}
          formatLabel={(item, index) => item.data[index].label}
          scale={scale.scaleBand}
          spacingInner={0.1}
          spacingOuter={0.1}
          contentInset={{ left: 80, right: 80 }}
        />
      </>
  );
};

export default Earnings;
