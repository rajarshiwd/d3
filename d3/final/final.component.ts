import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as d3 from "d3";
export interface ExpectedData {
  key: number,
  value: number,
  date: string
}
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  routerUrl: string;
  svg: any;
  chart: any;
  line: any;
  area: any;

  constructor(private router: Router) { }

  ngOnInit() {

    console.log(window.screen.width);

    this.routerUrl = this.router.url;

    console.log(this.router.url);
    console.log('url("' + this.routerUrl + '#smalldot")')

    this.plot();
  }



  plot() {
    var data: Array<ExpectedData> = [
      { key: 39, value: 60, date: "2014/01/01" },
      { key: 40, value: 58, date: "2014/01/02" },
      { key: 38, value: 59, date: "2014/01/03" },
      { key: 41, value: 56, date: "2014/01/04" },
      { key: 43, value: 57, date: "2014/01/05" },
      { key: 40, value: 55, date: "2014/01/06" },
      { key: 42, value: 56, date: "2014/01/07" },
      { key: 41, value: 52, date: "2014/01/08" },
      { key: 39, value: 54, date: "2014/01/09" },
      { key: 36, value: 57, date: "2014/01/10" },
      { key: 37, value: 56, date: "2014/01/11" },
      { key: 41, value: 59, date: "2014/01/12" },
      { key: 43, value: 56, date: "2014/01/13" },
      { key: 42, value: 52, date: "2014/01/14" },
      { key: 43, value: 48, date: "2014/01/15" },
      { key: 40, value: 47, date: "2014/01/16" },
      { key: 42, value: 48, date: "2014/01/17" },
      { key: 44, value: 45, date: "2014/01/18" },
      { key: 46, value: 43, date: "2014/01/19" },
      { key: 48, value: 41, date: "2014/01/20" },
      { key: 53, value: 36, date: "2014/01/21" },
      { key: 52, value: 34, date: "2014/01/22" },
      { key: 53, value: 32, date: "2014/01/23" },
      { key: 55, value: 34, date: "2014/01/24" },
      { key: 56, value: 32, date: "2014/01/25" },
      { key: 55, value: 30, date: "2014/01/26" },
      { key: 57, value: 28, date: "2014/01/27" },
      { key: 56, value: 26, date: "2014/01/28" },
      { key: 59, value: 24, date: "2014/01/29" },
      { key: 58, value: 22, date: "2014/01/30" },
      { key: 60, value: 20, date: "2014/01/31" }
    ];
    var w = window.screen.width;
    var h = 450;
    var margin = {
      top: 10,
      bottom: 100,
      left: 50,
      right: 50
    };
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;

    this.svg = d3.select(".container-fluid").append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)
      .style("background", "#F5F5DC")
      .style('text-align', "center");
    this.chart = this.svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("background", "green");
    var dateParser = d3.timeParse("%Y/%m/%d");

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
      .attr("class", "tooltip").style("margin","0px").style("padding","2px")
      .style("position","absolute").style("height","30px").style("border-radius","8px")
      .style("background", "lightsteelblue").style("font","12px sans-serif").style("width","60px")
      .style("opacity", 0);


    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) {
        var date = dateParser(d.date);

        return date;
      }))
      .range([0, width]);


    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) {
        return d.value;
      })])
      .range([height, 0]);


    var y1 = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) {
        return d.key;
      })])
      .range([height, 0]);

    var area = d3.area<ExpectedData>()
      .x(function (d) {

        return x(dateParser(d.date));
      })
      .y0(height)
      .y1(function (d) {
        return y(d['value']);
      });

    //line1 for value in data
    var line = d3.line<ExpectedData>()
      .x(function (d) {

        return x(dateParser(d.date));
      })
      .y(function (d) {
        return y(d['value']);
      });


    //line2 for key in data
    var line2 = d3.line<ExpectedData>()
      .x(function (d, i) {

        return x(dateParser(d.date));
      })
      .y(function (d) {
        return y1(d.key);
      });

// X-Axis 
    this.chart.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));

//labeling the x-axis
    this.chart.append("text")
      .attr("x", 325)
      .attr("y", 330)
      .style("text-anchor", "middle")
      .text("Date");

//Y0-axis 
    this.chart.append("g")
      .classed("y0 axis", true)
      .attr("transform", "translate(" + width + ",0)")
      .style("stroke", "red")
      .call(d3.axisRight(y).ticks(5));

//labeling the y0-axis
    this.chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -150)
    .attr("y", -25)
    .style("text-anchor", "middle")
    .text("Y0 -Axis");

// y1-Axis 
    this.chart.append("g")
      .classed("y1 axis", true)
      .style("stroke", "blue")
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y1).ticks(6));

//labeling the y1-axis
    this.chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -150)
      .attr("y", width + 30)
      .style("text-anchor", "middle")
      .text("Y1 - Axis");

//enter()
//area 
    this.chart.selectAll(".area")
      .data([data])
      .enter()
      .append("path")
      .classed("area", true);
    this.chart.selectAll(".trendline")
      .data([data])
      .enter()
      .append("path")
      .classed("trendline", true);
    this.chart.selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .classed("point", true)
      .attr("r", 2)
      .attr("cx", function (d) { return x(dateParser(d['date'])); })
      .attr("cy", function (d) { return y(d['value']); })
  // toggiling  the tooltip div  on mouse-over and mouse-leave 
      .on("mouseover", function (d) {  
        div.transition()
          .duration(200)
          .style("opacity", 1);
        div.html(d.date + "<br/>" + d.value)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 50) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });;

//update
    this.chart.selectAll(".area")
      .attr("d", area(data))
      .attr('fill', 'url(#linearGradientSit8n7y4m3)');

    this.chart.selectAll(".trendline")
      .attr("d", line(data))
      //.attr("fill","none")
      .style("stroke", "blue")
      .style("fill", "none")
    this.chart.selectAll(".point")
      .attr("cx", function (d) {
        var date = dateParser(d['date']);
        return x(date);
      })
      .attr("cy", function (d) {
        return y(d['value']);
      })
    //exit()
    this.chart.selectAll(".area")
      .data([data])
      .exit()
      .remove();
    this.chart.selectAll(".trendline")
      .data([data])
      .exit()
      .remove();
    this.chart.selectAll(".point")
      .data(data)
      .exit()
      .remove();

    //line2
    this.chart.selectAll(".area2")
      .data([data])
      .enter()
      .append("path")
      .classed("area2", true);
    this.chart.selectAll(".trendline2")
      .data([data])
      .enter()
      .append("path")
      .classed("trendline2", true);
    this.chart.selectAll(".point2")
      .data(data)
      .enter()
      .append("circle")
      .classed("point2", true)
      .attr("r", 2);
    //update
    this.chart.selectAll(".area2")
      .attr("d", area(data))
      .attr('fill', 'url(#linearGradientSit8n7y4m3)')

    this.chart.selectAll(".trendline2")
      .attr("d", line2(data))
      //.attr("fill","none")
      .style("stroke", "red")
      .style("fill", "none")
    this.chart.selectAll(".point2")
      .attr("cx", function (d) {
        var date = dateParser(d['date']);
        return x(date);
      })
      .attr("cy", function (d) {
        return y1(d['key']);
      })
    //exit()
    this.chart.selectAll(".area2")
      .data([data])
      .exit()
      .remove();
    this.chart.selectAll(".trendline2")
      .data([data])
      .exit()
      .remove();
    this.chart.selectAll(".point2")
      .data(data)
      .exit()
      .remove();
  }

}
