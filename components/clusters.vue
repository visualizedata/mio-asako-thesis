<template>
  <div>
    <h2>{{chartTitle}}</h2>
     <el-row>
      <el-col :span="24">
        <svg ref="asmdClusteringSVG" style= "float: right;" v-bind:width= "width" :height = "height"></svg>
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

    var myStemsByOutcome = d3.nest()
        .key(function(d) {return d.OutcomeClassifier;})
        .key(function(d) {return d.Discipline;})
        .key(function(d) {return d.Institution;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);

    var root = d3.hierarchy({values:myStemsByOutcome }, function(d) { return d.values;})
                 .sum(function(d) { return d.value})
                 .sort(function(a, b) { return b.value - a.value; });

    // draw circle packing
    d3.pack()
      .size([this.width, this.height])
      .padding(3)(root)

    var color = d3.scaleOrdinal()
        .domain(function(d){return d.Outcome})
        .range(d3.schemeSet3);

    var svg = d3.select(this.$refs.asmdClusteringSVG)
        .attr("width", this.width)
        .attr("height", this.height)

    const node = svg.selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("fill", d => d.value ? color(d.depth) : "white")
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .attr("r", d => d.r)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

      const label = svg.append("g")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.key)
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

},
  watch: {
  }
};
</script>