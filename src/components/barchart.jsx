// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import Data from './barChartData.json';
// import './barcss.css';

// export default function BarChart() {
//   const d3Chart = useRef();
//   const [data, setData] = useState(Data);
//   console.log(data);
//   useEffect(() => {
//     d3.selectAll('.xAxis').remove();
//     d3.selectAll('.yAxis').remove();
//     d3.selectAll('.rect').remove();
//     const margin = { top: 50, right: 30, bottom: 30, left: 60 };
//     const chartWidth =
//       parseInt(d3.select('#d3chart').style('width')) -
//       margin.left -
//       margin.right;
//     const chartHeight =
//       parseInt(d3.select('#d3chart').style('width')) -
//       margin.top -
//       margin.bottom;

//     const svg = d3
//       .select(d3Chart.current)
//       .attr('width', chartWidth + margin.left + margin.right)
//       .attr('height', chartHeight + margin.top + margin.bottom);

//     const x = d3
//       .scaleBand()
//       .domain(d3.range(data.length))
//       .range([margin.left, chartWidth - margin.right])
//       .paddingInner(0.1);


//     svg
//       .append('g')
//       .attr('transform', `translate(0,${chartHeight})`)
//       .attr('class', 'xAxis')
//       .call(
//         d3
//           .axisBottom(x)
//           .tickFormat((i) => data[i].country)
//           .tickSizeOuter(0)
//       );
//     const max = d3.max(data, (d) => d.consumption);
//     const y = d3
//       .scaleLinear()
//       .domain([0, max])
//       .range([chartHeight, 100]);

//     svg
//       .append('g')
//       .attr('transform', `translate(${margin.left},0)`)
//       .attr('class', 'yAxis')
//       .call(d3.axisLeft(y));

//     // svg
//     //   .append('g')
//     //   .attr('fill', '#65f0eb')
//     //   .selectAll('rect')
//     //   .data(Data)
//     //   .join('rect')
//     //   .attr('x', (d, i) => x(i) + 5)
//     //   .attr('y', (d) => y(d.consumption))
//     //   // .attr('height', (d) => y(0) - y(d.consumption))
//     //   .attr('width', x.bandwidth())
//     //   .transition()
//     //   .delay(200)
//     //   .duration(800)
//     //   .attr('y', (d) => y(d.consumption))
//     //   .attr('height', (d) => y(0) - y(d.consumption))
//     //   .delay((d, i) => i * 20);

//     const animation = d3.select(d3Chart.current).selectAll('rect').data(data);

//     animation
//       .enter()
//       .append('rect')
//       .attr('class', 'rect')
//       .attr('fill', 'pink')
//       .attr('width', x.bandwidth())
//       .attr('x', (d, i) => x(i) + 5)
//       .attr('y', y(0))
//       .attr('height', 0)
//       .transition()
//       .delay(200)
//       .duration(800)
//       .attr('y', (d) => y(d.consumption))
//       .attr('height', (d) => y(0) - y(d.consumption))
//       .delay((d, i) => i * 20);

//     animation
//       .exit()
//       .transition()
//       .duration(250)
//       .attr('y', (d) => y(0))
//       .attr('height', (d) => 0)
//       .remove();

//   }, [data]);

//   return (
//     <div id="d3chart">
//       <svg ref={d3Chart} />

//     </div>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [data, setData] = useState([
    {
      name: "abc",
      value: 40,
      color: "#1564B5"
    },
    {
      name: "abcd",
      value: 35,
      color: "#1564B5"
    },
    {
      name: "abcde",
      value: 30,
      color: "#1564B5"
    },
    {
      name: "abcdef",
      value: 25,
      color: "#1564B5"
    },
    {
      name: "abcdefg",
      value: 20,
      color: "#1564B5"
    },
    {
      name: "abcdefgh",
      value: 15,
      color: "#1564B5"
    }
  ]);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

 

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
      .range([0, 100]); // [0, 200]

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.value)]) // [0, 65 (example)]
      .range([0, 300]); // [0, 400 (example)]

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", entry => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index));

    // draw the labels
    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => ` ${entry.name} (${entry.name} account)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
