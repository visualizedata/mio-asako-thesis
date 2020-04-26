<template>
  <div>
    <h2>{{chartTitle}}</h2>
    <svg ref="asmdClusteringSVG" v-bind:width= "width" :height = "height">
    </svg>
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
      .filter(this.isStem);

    //test groupby code
    var myStemsByOutcome = d3.nest()
        .key(function(d) {return d.Outcome;})
        .key(function(d) {return d.Discipline;})
        .key(function(d) {return d.Institution;})
        .key(function(d) {return d.Person;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);

    myStemsByOutcome = {"key": "Outcomes", "values": myStemsByOutcome};

    console.log("MyStemsByOutcome");
    console.log(myStemsByOutcome);

    var treemap = d3.treemap()
        .size([this.width, this.height])
        .padding(1)
        .round(true);

    //circle packing starts here:

    //variables for circle packing & zooming
    
    var pack = myStems => d3.pack()
        .size([this.width, this.height])
        .padding(3)

    d3.hierarchy(myStemsByOutcome)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    
    const root = pack(myStems);
    let focus = root;
    let view;

    var width = this.width;
    var height = this.height;

    //functions needed for zoom
    // function zoomTo(v) {
    //     const k = width / v[2];

    //     view = v;

    //     label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    //     node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    //     node.attr("r", d => d.r * k);
    // }

    // function zoom(d) {
    // const focus0 = focus;
    // focus = d;

    // const transition = svg.transition()
    //     .duration(d3.event.altKey ? 7500 : 750)
    //     .tween("zoom", d => {
    //       const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
    //       return t => zoomTo(i(t));
    //     });

    // label
    //   .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
    //   .transition(transition)
    //     .style("fill-opacity", d => d.parent === focus ? 1 : 0)
    //     .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
    //     .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    // }

    //color range
    var color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl)


    //make the svg
    const svg = d3.select(this.$refs.asmdClusteringSVG)
      .attr("viewBox", `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));
    
    
    // const node = svg.append("g")
    //     .selectAll("circle")
    //     .data(root.descendants().slice(1))
    //     .join("circle")
    //     .attr("fill", d => d.children ? color(d.depth) : "white")
    //     .attr("pointer-events", d => !d.children ? "none" : null)
    //     .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
    //     .on("mouseout", function() { d3.select(this).attr("stroke", null); })
    //     .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

    // const label = svg.append("g")
    //     .style("font", "10px sans-serif")
    //     .attr("pointer-events", "none")
    //     .attr("text-anchor", "middle")
    //     .selectAll("text")
    //     .data(root.descendants())
    //     .join("text")
    //     .style("fill-opacity", d => d.parent === root ? 1 : 0)
    //     .style("display", d => d.parent === root ? "inline" : "none")
    //     .text(d => d.data.name);

    // zoomTo([root.x, root.y, root.r * 2]);
    
    
    
    
    // return svg.node();





},
  watch: {
  }
};
</script>

<style scoped>

</style>