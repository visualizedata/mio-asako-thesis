<template>
  <div>
    <h2>{{chartTitle}}</h2>
    <svg ref="asmdCircleGraphSVG" v-bind:width= "width" :height = "height">
    </svg>
    <div class="cases" ref="caseDetail">
        <h2>Institution: {{ caseDetailInstitution }}</h2>
        <h2>Discipline:</h2>
        <h2>Story: </h2>
    </div>
  </div>
</template>

<style>
</style>

<script>
import * as d3 from "d3";

import utilsMixin from '~/mixins/utils.js'

export default {
  name: "asmd",
  data(){
    return{
      chartTitle: "Academic Sexual Misconduct Cases",
      height: 800, //why does window.innerHeight not work?
      width: 1500,
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
      caseDetailInstitution: "no institution yet"
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
  mixins: [utilsMixin],
  methods: {
  },
  computed: {
  },
  mounted() {

    console.log("ASMD mounted 😷");

    // this exists, because it is defined as `required` in the props
    const asmdData = this.asmdData;

    // filter out asmdData that's a stem!
    var myStems = this.asmdData
      .filter(this.isValid)
      .filter(this.isStem);

    var incidentColor = function(e){
      return e.toLowerCase().indexOf("resigned") === -1 ? "#ff6767" : "#6767ff";
    }

    // we need this to convert a date of the form 2000 to 2000-01-01:12:00:000
    var parseDate = d3.timeParse("%Y");

    var startYear = Math.min(...myStems.map(function(a){
      return a['Outcome Year'];
    }));
    console.log("startYear: " + startYear);

    var endYear = Math.max(...myStems.map(function(a){
      return a['Outcome Year'];
    }));
    console.log("endYear: " + endYear);
    var nBins = endYear - startYear;

    var circleRadius = 7; // FIXME: why does this circleRadius fix the y-axis?
    
    // Set the ranges of x and y
    var x = d3.scaleTime()
        .rangeRound([0,this.width])
        .domain([new Date(1980, 1, 1), new Date(2019, 12, 31)])

    var histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(nBins))
      .value(function(d) { return parseDate(d['Outcome Year'])});

    // Compute the histogram
    var bins = histogram(myStems);

    console.log("Number of calculated bins: " + bins.length);

    var maxCases = Math.max(...bins.map(function(a){
      return a.length;
    }));

    var tooltipOn = function(d) {
        // x position of parent g element
        let gParent = d3.select(this.parentElement)
        let translateValue = gParent.attr("transform")

        d3.select(this)
          .classed("selected", true)
          .style("opacity", .5)
          .style("cursor", "pointer")
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("<b><span style = 'font-size: 36px; color: #6767ff; text-transform: uppercase;'>"+ d.name + "</span></b>" + "</br>" + "<b>Outcome:  </b>" + d.outcome + "</br>" + "<b>Institution:  </b>" + d.institution + "</br>" +  "<b>Discipline:  </b>" + d.discipline + "</br>" + "<b>Story: </b>" + d.story + "</b>")
          .style("left", 300 + "px")
          .style("top", 300 + "px")
          .style("margin", "10px");

        this.caseDetailInstitution = "now loog!"
      };

    var tooltipOff = function(d) {
        d3.select(this)
          .classed("selected", false)
          .style("fill", function(d){ return d.color; })
          .style("opacity", 1);

        tooltip.transition()
            .duration(500)
            .style("opacity", 1);
      };

    var width = window.innerWidth;
    var height = window.innerHeight;

    var y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, maxCases]); // FIXME: it almost works when I multiply by (this.width/this.height)

    // Adds the svg canvas
    var svg = d3.select(this.$refs.asmdCircleGraphSVG)
        .attr("width", this.width)
        .attr("height", this.height)

    console.log("window width: " + window.innerWidth);

    // add the tooltip area to the webpage
    var tooltip = 
        d3.select(this.$refs.caseDetail)
          .append()
          .attr("class", "tooltip")
          .style("opacity", 0.2)

    // g container for each bin
    let binContainer = svg.selectAll(".gBin")
        .data(bins);

    binContainer.exit().remove()

    console.log("$refs: " + JSON.stringify(this.$refs))
    console.log("this.caseDetailInstitution: " + this.caseDetailInstitution)

    let binContainerEnter = binContainer.enter()
        .append("g")
        .attr("class", "gBin")

    // need to populate the bin containers with data the first time
    binContainerEnter.selectAll("rect")
          .data(d => d.map((p, i) => {
            return {idx: i,
                    name: p['Person'],
                    outcome: p.Outcome,
                    institution: p["Institution"],
                    discipline: p["Specific Discipline"],
                    link: p["Original Link(s)"],
                    color: "#ffffff",
                    story: p["Specific Outcome"]
                  }
          }))
        .enter()
        .append("rect")
          .attr("class", "enter")
          .attr("x", 0) // g element already at correct x pos
          .attr("y", function(d) {
                return - 2*circleRadius * ( d.idx + 0.5 );
               })
          .attr("height", circleRadius)
          .attr("width", circleRadius *3)
          .style("fill", function(d){ return incidentColor(d.outcome); })

          .on("mouseover", function(d, i){console.log("Mousover outcome:"  + outcome[i])})
          .on("mouseover", tooltipOn)
          .on("click", tooltipOff)
          .on("mouseout", tooltipOff)
          .on("click", function(d){
           window.open(d.link)
          })

      binContainerEnter.merge(binContainer)
          .attr("transform", d => `translate(${x(d.x0)}, ${this.height})`);
      
      // add x axis
      svg.append("g")
        .style("font", "12px helvetica")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .style("stroke", "white")
        .call(d3.axisTop(x));

      // add y axis
      svg.append("g")
        .style("font", "12px helvetica")
        .attr("class", "axis axis--y")
        .style("stroke", "white")
        .call(d3.axisRight(y));

  },
  watch: {
  }
};
</script>

<style scoped>

.tooltip {
  color: white;
  position: relative;
  text-align: left;
  /*text-transform: uppercase;*/
  max-width: 400px;
  height: auto;
  font-family: helvetica, sans-serif;
  font-size: 15px;
  background: #ffffff;
  display: inline-block;
  border: 1px solid #777777;
  /*border-radius: 5px;*/
  pointer-events: none;
  box-shadow: 0 6px 12px rgba(0,0,0,.5);
  margin: 5px;
  padding: 10px;
}

</style>