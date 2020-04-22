<template>
  <div>
    <h2>ASMD test</h2>

     <svg ref="asmdCircleGraphSVG">

    <!-- <ul>
      <li v-for="(asmd, index) in asmdData" :key="index">{{asmd.Person}} ({{asmd.Outcome}})</li>
    </ul> -->
   
    </svg>
  </div>
</template>

<style>
</style>

<script>
import * as d3 from "d3";

export default {
  name: "asmd",
  data(){
    return{
      chartTitle: "Academic Sexual Misconduct Cases",
      height: 800, //why does window.innerHeight not work?
      width: 1200,
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
      //data: this.asmdData,
    }
  },
  props: {
    // this component requires the outer "page" that uses this component
    // to populate `asmdData`, and it should be an array
    asmdData: {
      type: Array,
      required: true
    }
  },
  methods: {
  },
  computed: {
  },
  mounted() {

    console.log("ASMD mounted 😷");

    // this exists, because it is defined as `required` in the props
    const asmdData = this.asmdData;

    // naive stem identifier
    var isStem = function(s) {
        // array of stem substrings
        var stemNames = ['math','bio','med', 'health', 'psych', 'engineering', 'neuro', 'physical science', 'physics', 'anthro', 'chem', 'life', 'computer', 'geo', 'ecology', 'sociology', 'political', 'information', 'statistics','criminology'];
        var containsName = function(name) {
          return !(s.toLowerCase().indexOf(name) === -1);
        }
        // array of true or false, where true if includes any of stemNames
        var res = stemNames.map(containsName);
        // return true if _any_ of the results are true
        return res.some(function(b){ return b === true ;})
    }

    // filter out asmdData that's a stem!
    var myStems = this.asmdData.filter(function(element){
      var toInspect = element['Discipline'];
      if(toInspect.length < 1){ return false; }
      return isStem(toInspect);
    })

    // we need this to convert a date of the form 2000 to 2000-01-01:12:00:000
    var parseDate = d3.timeParse("%Y");

    // Set the ranges of x and y
    /*var x = d3.scaleTime()
        .rangeRound([0,this.width])
        .domain([new Date(1980, 1, 1), new Date(2020, 1, 1)])

    // create a histogram
    var histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(39))
      .value(function(d) { return parseDate(d['Outcome Year']);})
    
    var bins = histogram(myStems);

    console.log(bins)
    console.log(this.width + "," + this.height);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
      y.range([this.height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);

    // takes a string of format 'Incident 1234`
    // and returns `1234`
    var parseIncidentNumber = function(s) {
        return s.split(' ')[1];
    };

    console.log("🤟 nr stems: ", myStems.length);
 
    // this is the main graph
    const svg = d3
      .select(this.$refs.asmdCircleGraphSVG)
      .attr("width", this.width)
      .attr("height", this.height);

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return (d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return y(d.length); })
        .style("fill", "#29b3a2")
        .style("stroke", "#ffffff")

    // add x axis
    svg.append("g")
      //.style("font", "12px futura-pt")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // add y axis
    svg.append("g")
      //.style("font", "12px futura-pt")
      .attr("class", "axis axis--y")
      .call(d3.axisRight(y));*/
    
    // Set the ranges of x and y
var x = d3.scaleTime()
    .rangeRound([0,this.width])
    .domain([new Date(1980, 1, 1), new Date(2019, 12, 31)])
var y = d3.scaleLinear()
    .range([this.height, 0]);

// Adds the svg canvas
var svg = d3.select(this.$refs.asmdCircleGraphSVG)
  .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
  //.append("g")
  //  .attr("transform",
   //           "translate(" + this.margin.left + "," + this.margin.top + ")")

// add the tooltip area to the webpage
// var tooltip = d3.select(this.$refs.asmdCircleGraphSVG).append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0)
//     .style("fill", "ffffff");

// //update the graph
// //function update(){

// var t = d3.transition()
//       .duration(1000);

// var dataIndex = 0

//     y.domain([0, myStems.length]);

//     // Set up the binning parameters for the histogram
//     var nbins = 39;
//     //var nbins = eval("data"+dataIndex).length; 189
//     console.log(nbins);


//     var histogram = d3.histogram()
//       .domain(x.domain())
//       .thresholds(x.ticks(nbins))
//       .value(function(d) { return parseDate(d['Outcome Year'])});


//     // Compute the histogram
//     //var bins = histogram(eval("data"+dataIndex));
//     var bins = histogram(myStems);
//     //var bins = histogram(data0).filter(d => d.length>0)
//     console.log(bins);

//  //g container for each bin
//     let binContainer = svg.selectAll(".gBin")
//       .data(bins);

//     binContainer.exit().remove()

//     let binContainerEnter = binContainer.enter()
//       .append("g")
//         .attr("class", "gBin")
//         .attr("transform", d => `translate(${x(d.x0)}, ${this.height})`)

//     //need to populate the bin containers with data the first time
//    binContainerEnter.selectAll("circle")
//         .data(d => d.map((p, i) => {
//           return {idx: i,
//                   name: p['Person'],
//                   value: p.Outcome,
//                   institution: p["Institution"],
//                   discipline: p["Specific Discipline"],
//                   link: p["Link(s)"],
//                   radius: 5
//                 }
//         }))
//       .enter()
//       .append("circle")
//         .attr("class", "enter")
//         .attr("cx", 0) //g element already at correct x pos
//         .attr("cy", function(d) {
//             return - d.idx * 2 * d.radius - d.radius; })
//         .attr("r", 5)
//         .style("fill", "#ffffff")
//         //.on("mouseover", function(d, i){console.log(value[i])})
//         //.on("mouseover", tooltipOn)
//         //.on("click", tooltipOff)
//         //.on("mouseout", tooltipOff)
//         /*.on("click", function(d){
//           window.open(d.link)
//         })
//         .transition()
//           .duration(500)
//           .attr("r", function(d) {
//           return (d.length==0) ? 0 : d.radius; })*/

//     binContainerEnter.merge(binContainer)
//         .attr("transform", d => `translate(${x(d.x0)}, ${this.height})`);
    
    // add x axis
    // svg.append("g")
    //   .style("font", "12px futura-pt")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   //.style("stroke", "white")
    //   .call(d3.axisBottom(x));



  },
  watch: {
    }
};
</script>

