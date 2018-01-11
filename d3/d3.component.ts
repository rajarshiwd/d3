import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";

export interface ExpectedData {
    date: Date,
    y0: number,
    y1:number
}

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css']
})
export class D3Component implements OnInit {

    @Input() dataArray;
    @Input() xLabel;
    @Input() y0Label;
    @Input() y1Label;

  constructor() { }

  ngOnInit() {
 
    
    var parseTime = d3.timeParse("%d-%b-%y");

    //format the data
    var xProp = this.xLabel;
    var y0Prop = this.y0Label;
    var y1Prop = this.y1Label


    var data:Array<ExpectedData> = this.dataArray.map(function(d) {
    return {
    date: parseTime(d[xProp]),
    y0: parseInt(d[y0Prop]),
    y1: parseInt(d[y1Prop])
    }
    
     });
    
    console.log(data[0]);
    var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;


   
var x = d3.scaleTime()
.domain(d3.extent(data,function(d){
  return d.date;
})).range([0, width]);

var y0 = d3.scaleLinear()
.domain([ d3.min(data,(d)=> d.y0), d3.max(data,(d)=> d.y0)])
.range([height, 0]);
var y1 = d3.scaleLinear()
.domain([ d3.min(data,(d)=> d.y1), d3.max(data,(d)=> d.y1)])
.range([height, 0]);

let valueline = d3.line<ExpectedData>()
    .x(function(d) { return x(d['date']); })
    .y(function(d) { return y0(d['y0']); })
    .curve(d3.curveMonotoneX);
var valueline2 = d3.line<ExpectedData>()
    .x(function(d) { return x(d['date']); })
    .y(function(d) { return y1(d['y1']); })
    .curve(d3.curveMonotoneX);
  
var svg = d3.select(".chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");



    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) {
		return Math.max(d.y0); })]); 
    y1.domain([0, d3.max(data, function(d) { 
		return Math.max(d.y1); })]);
  
    
    svg.append("path")        // Add the valueline path.
    .style("stroke", "blue")
    .style("fill","none") 
    .attr("d", valueline(data));

    svg.append("path")        // Add the valueline2 path.

    .style("stroke", "red")
        .style("fill","none")
        .attr("d", valueline2(data));

    svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

        // svg.append("g")            // Add the X Axis
        // .attr("class", "x axis")
        // .attr("transform", "translate(0,0)")
        // .call(d3.axisBottom(x).ticks(5));

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(d3.axisLeft(y0).ticks(6));

    svg.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width + " ,0)")	
        .style("fill", "red")		
        .call(d3.axisLeft(y1).ticks(5));
}

}


