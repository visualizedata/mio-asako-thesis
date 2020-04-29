<template>
  <div>
    <svg ref="asmdClusteringSVG" style= "float: right;" v-bind:width= "width" :height = "height"></svg>
  </div>
</template>

<style>
</style>

<script>
import * as d3 from "d3";

import utilsMixin from '~/mixins/utils.js'

export default {
  name: "clusters",
  data(){
    return{
      chartTitle: "Clustering of outcomes",
      height: 1000, //why does window.innerHeight not work?
      width: 1000,
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
  mixins: [utilsMixin],
  methods: {
  },
  computed: {
  },
  mounted() {

    console.log("cluster mounted 😷");

    // this exists, because it is defined as `required` in the props
    const asmdData = this.asmdData;

    // filter out asmdData that's a stem!
    var myStems = this.asmdData
      .filter(this.isValid)
      .filter(this.isStem)
      .map(this.addOutcomeClassifier);

    // the order here creates different hierarchies
    var myStemsByOutcome = d3.nest()
        .key(function(d) {return d.OutcomeClassifier;})
        .key(function(d) {return d.Discipline;})
        //.key(function(d) {return d.Institution;})
        .key(function(d) {return d.Person;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);
    
    console.log(myStemsByOutcome);

    var root = d3.hierarchy({values:myStemsByOutcome }, function(d) { return d.values;})
                 .sum(function(d) { return d.value})
                 .sort(function(a, b) { return b.value - a.value; });

    // draw circle packing
    d3.pack()
      .size([this.width, this.height])
      .padding(3)(root)
    
    console.log(root)

    // create a color scheme
    var colorO = d3.scaleOrdinal()
        .domain(function(d){return d.OutcomeClassifier})
        .range(d3.schemeSet3);

    var colorD = d3.scaleOrdinal()
        .domain(function(d){return d.Discipline})
        .range(d3.schemeSet2);

    var colorI = d3.scaleOrdinal()
        .domain(function(d){return d.Institution})
        .range(d3.schemeSet3);

    // select the SVG
    var svg = d3.select(this.$refs.asmdClusteringSVG)
        .attr("width", this.width)
        .attr("height", this.height)

    // draw circles for every cluster
    const node = svg.selectAll("circle")
        .data(root.descendants().slice(1)) // slice(1) removes outer circle
        .join("circle")
        //.attr("fill", d => d.value ? color(d.depth) : "white") //color needs to change
        .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                        : d.depth == 2 ? colorD(d.data.key)
                                        : d.depth == 1 ? colorO(d.data.key)
                                        : color(d.data.key);
        })
        //.attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .attr("r", d => d.r)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    

    // label every circle (depending on criteria)
    const label = svg.append("g")
    .selectAll("text")
    .data(root.descendants())
    .on("mouseover", function() { d3.select(this).style("display", "inline"); }) 
    .join("text")
        .attr("pointer-events", "all")
        .style("display", d => d.parent === root ? "inline" : "none") // here's the criterion
        // .style("display", function(d) {return d.depth == 3 ? "none"
        //                     : d.depth == 2 ? "inline"
        //                     : d.depth == 1 ? "inline"
        //                     : "inline";
        //                     })
        .text(d => d.data.key)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

},
  watch: {
  }
};
</script>