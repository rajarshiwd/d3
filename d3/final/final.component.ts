import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
export interface ExpectedData {
  key: string,
  value: number,
  date:string
} 
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  this.plot();
  }

   
  
  //  xAxis = d3.axis()
  //       .scale(x)
  //       .orient("bottom")
  //       .ticks(d3.time.days, 7)
  //       .tickFormat(d3.time.format("%m/%d"));
  // var yAxis = d3.svg.axis()
  //       .scale(y)
  //       .orient("left")
  //       .ticks(5);
 
  
   plot(){
     var data:Array<ExpectedData> = [
      {key: "Jelly", value: 60, date: "2014/01/01" },
      {key: "Jelly", value: 58, date: "2014/01/02" },
      {key: "Jelly", value: 59, date: "2014/01/03" },
      {key: "Jelly", value: 56, date: "2014/01/04" },
      {key: "Jelly", value: 57, date: "2014/01/05" },
      {key: "Jelly", value: 55, date: "2014/01/06" },
      {key: "Jelly", value: 56, date: "2014/01/07" },
      {key: "Jelly", value: 52, date: "2014/01/08" },
      {key: "Jelly", value: 54, date: "2014/01/09" },
      {key: "Jelly", value: 57, date: "2014/01/10" },
      {key: "Jelly", value: 56, date: "2014/01/11" },
      {key: "Jelly", value: 59, date: "2014/01/12" },
      {key: "Jelly", value: 56, date: "2014/01/13" },
      {key: "Jelly", value: 52, date: "2014/01/14" },
      {key: "Jelly", value: 48, date: "2014/01/15" },
      {key: "Jelly", value: 47, date: "2014/01/16" },
      {key: "Jelly", value: 48, date: "2014/01/17" },
      {key: "Jelly", value: 45, date: "2014/01/18" },
      {key: "Jelly", value: 43, date: "2014/01/19" },
      {key: "Jelly", value: 41, date: "2014/01/20" },
      {key: "Jelly", value: 37, date: "2014/01/21" },
      {key: "Jelly", value: 36, date: "2014/01/22" },
      {key: "Jelly", value: 39, date: "2014/01/23" },
      {key: "Jelly", value: 41, date: "2014/01/24" },
      {key: "Jelly", value: 42, date: "2014/01/25" },
      {key: "Jelly", value: 40, date: "2014/01/26" },
      {key: "Jelly", value: 43, date: "2014/01/27" },
      {key: "Jelly", value: 41, date: "2014/01/28" },
      {key: "Jelly", value: 39, date: "2014/01/29" },
      {key: "Jelly", value: 40, date: "2014/01/30" },
      {key: "Jelly", value: 39, date: "2014/01/31" }
    ];
    var w = 800;
    var h = 450;
    var margin = {
      top: 58,
      bottom: 100,
      left: 80,
      right: 40
    };
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;
    
    var svg = d3.select("body").append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h);
    var chart = svg.append("g")
          .classed("display", true)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
         var  dateParser = d3.timeParse("%Y/%m/%d");
  
    var x = d3.scaleTime()
       .domain(d3.extent(data, function(d){
        var date = dateParser(d.date);
      
         return date;
       }))
       .range([0,width]);
    var y = d3.scaleLinear()
       .domain([0, d3.max(data, function(d){
         return d.value;
       })])
       .range([height,0]);
    var area = d3.area<ExpectedData>()
    .x(function(d){
                
      return x(dateParser(d.date));
    })
    .y0(height)
    .y1(function(d){
      return y(d['value']);
    });
    var   line = d3.line<ExpectedData>()
    .x(function(d){
     
      return x(dateParser(d.date));
    })
    .y(function(d){
      return y(d['value']);
    });
    svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));;
    svg.append("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y).ticks(5));
    //enter()
    chart.selectAll(".area")
      .data([data])
      .enter()
        .append("path")
        .classed("area", true);
    chart.selectAll(".trendline")
      .data([data])
      .enter()
        .append("path")
        .classed("trendline", true);
    chart.selectAll(".point")
      .data(data)
      .enter()
        .append("circle")
        .classed("point", true)
        .attr("r", 2);
    //update
    chart.selectAll(".area")
      .attr("d",area(data))
    chart.selectAll(".trendline")
      .attr("d", line(data))
    chart.selectAll(".point")
      .attr("cx", function(d){
        var date = dateParser(d['date']);
        return x(date);
      })
      .attr("cy", function(d){
        return y(d['value']);
      })
    //exit()
   chart.selectAll(".area")
      .data([data])
      .exit()
      .remove();
    chart.selectAll(".trendline")
      .data([data])
      .exit()
      .remove();
    chart.selectAll(".point")
      .data(data)
      .exit()
      .remove();
  }
  
}
