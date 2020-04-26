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

    // console.log("myStems: ")
    // console.log(myStems)

    //test groupby code
    var myStemsByOutcome = d3.nest()
        .key(function(d) {return d.OutcomeClassifier;})
        .key(function(d) {return d.Discipline;})
        .key(function(d) {return d.Institution;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);

    var treemap = d3.treemap()
        .size([this.width, this.height])
        .padding(1)
        .round(true);

    var root = d3.hierarchy({values:myStemsByOutcome }, function(d) { return d.values;})
                 .sum(function(d) { return d.value})
                 .sort(function(a, b) { return b.value - a.value; });

    // draw circle packing
    d3.pack(root)

    var color = d3.scaleOrdinal()
        .domain(function(d){return d.Outcome})
        .range(d3.schemeSet3);


    var svg = d3.select(this.$refs.asmdClusteringSVG)
        .attr("width", this.width)
        .attr("height", this.height)

    const circleNode = svg.selectAll("g")
        .data(root.descendants().slice(1))
        .join("g")
        .attr("fill", d => d.values ? color(d.depth) : "white")
 

    // draw treemap
    // treemap(root);

    // var treenode = d3.select(this.$refs.asmdClustering)
    //     .attr("width", this.width)
    //     .attr("height", this.height)
    //     .selectAll(".node")
    //     .data(root.leaves())
    //     .enter().append("div")
    //         .attr("class", "node")
    //         .style("left", function(d) { return d.x0 + "px"; })
    //         .style("top", function(d) { return d.y0 + "px"; })
    //         .style("width", function(d) { return d.x1 - d.x0 + "px"; })
    //         .style("height", function(d) { return d.y1 - d.y0 + "px"; })
    //         .style("background", function(d){ return color(d.parent.parent.data.key)});

    // treenode.append("div")
    //     .attr("class", "node-label")
    //     .text(function(d) { 
    //           return d.parent.parent.data.key + " in " + d.parent.data.key + " at " + d.data.key; 
    //         });

    // treenode.append("div")
    //     .attr("class", "node-value")
    //     .text(function(d) { return d.value; });

},
  watch: {
  }
};
</script>