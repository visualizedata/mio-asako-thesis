<template>

  <div id="container">

    <!-- our title -->
    <h2> {{ chartTitle }} </h2>

    <el-row>

      <el-col :span= "8">
        <div class="outcomes" ref="caseStudyDetail"></div>
      </el-col>

      <el-col :span= "16">
        <svg ref="caseStudiesSVG"></svg>
      </el-col>

    </el-row>

  </div>
</template>

<style>
</style>

<script>
import * as d3 from "d3";

import utilsMixin from '~/mixins/utils.js'

export default {
  name: "casestudybars",
  data(){
    return{
      chartTitle: "CASE STUDIES OF MISCONDUCT CASES WITH OUTCOMES IN 2018",
      height: 1000, //why does window.innerHeight not work?
      width: 1000,
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
      //data: this.asmdData,
    }
  },
  props: {
    // this component requires the outer "page" that uses this component
    // to populate `asmdData`, and it should be an array
    caseStudyData: {
      type: Array,
      required: true
    },
        // this indicates the step of our sibling component
    stepValue: {
      type: Number,
      required: true
    }
  },
  mixins: [utilsMixin],
  methods: {
  },
  computed: {
  },
  mounted() {

    console.log("cluster mounted 😷");

    // this exists, because it is defined as `required` in the props
    const caseStudyData = this.caseStudyData;

    console.log("caseStudyData:");
    console.log(caseStudyData);

    var width = window.innerWidth
    var height = window.innerHeight

    var parseDate = d3.timeParse("%Y");

    const midYear = 1995;

    // our time scale is centered around 1995, with 25 years left and right of it
    var x = d3.scaleTime()
              .rangeRound([0,this.width])
              .domain([new Date(1970, 1, 1), new Date(2020, 1, 1)])

    // create a custom x-axis for our timescale
    // it is 50 years wide, centered around the year 0
    var x2 = d3.scaleLinear()
            .rangeRound([this.margin.left, this.width-this.margin.right])
            .domain([-25, 25])

    // one tick every 5 years
    var xAxis = d3.axisTop(x2)
                  .ticks(10)

    // divide y-axis by number of cases
    var y = d3.scaleBand()
              .domain(d3.range(caseStudyData.length))
              .rangeRound([this.margin.top, this.height-this.margin.bottom])
              .padding(0.1)

    // we calculate a year in pixels on the x-axis to be able to translate
    // back to year 0
    const yearInPixels = x(parseDate(2001)) - x(parseDate(2000));

    // function to be called when hovering over circle
    var tooltipOn = function(d) {
      // change the appearance of the circle ?
      d3.select(this)
        .attr("cursor", "pointer")
      // transition tooltip
      tooltip.transition()
             .duration(200)
             .style("opacity", 1)
      // write html
      tooltip.html("<b><span style = 'font-size: 36px; color: #6767ff;'>"+ d.description + "</span></b>")

      d3.selectAll("rect")
        .style("opacity", 0.3)
      
      d3.select(d3.event.currentTarget)
        .style("opacity", 1)
    }
    
    // function to be called when hovering _off_ the circle
    var tooltipOff = function(d) {
      d3.select(this)
        .attr("opacity", "1.0")
      // transition tooltip
      tooltip.transition()
             .duration(500)
             .style("opacity", 0);

      d3.selectAll("rect")
        .style("opacity", 1)
    };

    // draw on our SVG
    var svg = d3.select(this.$refs.caseStudiesSVG)
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0,0,this.width,this.height])
    
    // draw a rectangle for each case, then translate it to the mid-year
    svg.append("g")
        .selectAll("rect")
        .data(caseStudyData)
        .join("rect")
            .attr("fill", d => d.name == "Title IX investigation" ? "#ff6767"
                                      : "#6767ff")
            .attr("x", d => x(parseDate(d.first_incident)))
            .attr("y", (d,i) => y(i))
            // width is number of years between outcome and first_incident (times yearInPixels)
            .attr("width", d => yearInPixels * (d.outcome - d.first_incident))
            .attr("height", y.bandwidth())
            // translate the rectangle to that first_complaint is in the middle
            .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
            .on("mouseover", tooltipOn)
            .on("mouseout", tooltipOff)
    
    // draw the name of the incident
    svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("font-family", "Lato")
        .attr("font-size", 12)
        .selectAll("text")
        .data(caseStudyData)
        .join("text")
            .attr("x", d => x(parseDate(d.first_incident)) - 4)
            .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .text(d => d.name)
            // move the text since we moved the box
            //.attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
            .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_incident)}, ${0})`)

    // append the x-axis
    svg.append("g")
        .style("font", "12px helvetica")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .style("stroke", "white")
        .call(xAxis)

    // draw the first_complaint at midYear
    var bars = svg.selectAll(".bar")
        .data(caseStudyData)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(parseDate(d.first_complaint)))
            .attr("y", (d,i) => y(i))
            .attr("width", 2)
            .attr("height", y.bandwidth())
            .attr("fill", "#ffffff")
            .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
    
    var tooltip = d3.select(this.$refs.caseStudyDetail)
                    .append()
                    .attr("class", "tooltip")

},
  watch: {
  // this is our stepValue listener and we update the text with the proper
  // value whenever it is being triggered
    stepValue: function(){
      console.log("hey i'm case study bars and i'm watching stepValue");
      var svg = d3.select(this.$refs.caseStudiesSVG)
                  .select('text')
                  .text("slider in step: " + this.stepValue)
    }
  }
};
</script>