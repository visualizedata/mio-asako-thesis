<template>
  <div>
    <svg ref="caseStudiesSVG" v-bind:width= "width" :height = "height"></svg>
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
      chartTitle: "case study bars",
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

    var parseDate = d3.timeParse("%m/%d/%Y");

    

    var x = d3.scaleLinear()
            .domain(d3.extent(caseStudyData, d => d.x2))
            .rangeRound([this.margin.left, this.width-this.margin.right])

    var y = d3.scaleBand()
            .domain(d3.range(caseStudyData.length))
            .rangeRound([this.margin.top, this.height-this.margin.bottom])
            .padding(0.1)
    
    console.log(y)
    
    //make sure data is going through x and y variables
    console.log("x and y domains:")
    console.log(d3.range(caseStudyData.length));
    console.log(d3.extent(caseStudyData, d => d.x2))


    var testData = [ {title: "test", value: 123}, {title:"asasd", value: 456} ];

    var svg = d3.select(this.$refs.caseStudiesSVG)
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0,0,this.width,this.height])
        
        
    svg.append("g")
        .selectAll("rect")
        .data(caseStudyData)
        .join("rect")
            .attr("fill", "#6767ff")
            .attr("x", x(0))
            .attr("y", (d,i) => y(i))
            .attr("width", d => x(d.x2))
            .attr("height", y.bandwidth());
    
        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .attr("font-family", "Lato")
            .attr("font-size", 12)
            .selectAll("text")
        .data(caseStudyData)
        .join("text")
        .attr("x", d => x(d.x2) - 4)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.name);

},
  watch: {
  }
};
</script>