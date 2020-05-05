<template>

  <div id="container">

    <!-- our title -->
    <h2> {{ chartTitle }} </h2>

    <el-row>

      <el-col :span= "8">
        <div class="outcomes" ref="outcomeDetail"></div>
      </el-col>

      <el-col :span= "16">
        <svg ref="asmdClusteringSVG"></svg>
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
  data(){
    return{
      chartTitle: "PATTERNS OF MISCONDUCT CASE OUTCOMES",
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
    },
    // this indicates the step of our sibling component
    stepValue: {
        type: Number,
        required: true
    }
  },
  mixins: [utilsMixin],
  methods: {
    // TODO: this needs to be enabled somewhere
    resize(){
      console.log('resized window');
      this.width = this.$refs.container.offsetWidth;
      this.height = this.width;

      d3.select(this.$refs.asmdClusteringSVG)
        .attr('width', this.width)
        .attr('height', this.height)
    }
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
        .key(function(d) {return d["Specific Discipline"];})
        .key(function(d) {return d.Institution;})
        //.key(function(d) {return d.Person;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);
    

    var root = d3.hierarchy({values:myStemsByOutcome }, function(d) { return d.values;})
                 .sum(function(d) { return d.value})
                 .sort(function(a, b) { return b.value - a.value; });

    // function to be called when hovering over circle
    var tooltipOn = function(d) {
      // change the appearance of the circle ?
      d3.select(this)
        //.attr("opacity", "0.4")
      // transition tooltip
      tooltip.transition()
             .duration(200)
             .style("opacity", 1)
      // write html
      tooltip.html("<b><span style = 'font-size: 36px; color: #6767ff;'>"+ d.data.key + "</span></b>")

      d3.selectAll("circle")
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
      d3.selectAll("circle")
        .style("opacity", function(d){return d.depth == 3 ? 1
                                    : d.depth == 2 ? 0.7
                                    : d.depth == 1 ? 0.5
                                    : 1;
        })
    };

    // draw circle packing
    d3.pack()
      .size([this.width, this.height])
      .padding(3)(root)

    // create a color scheme

    var colorD = d3.scaleOrdinal()
        .domain(function(d){return d.Discipline})
        .range(d3.schemeSet2);

    var colorO = d3.scaleOrdinal()
        .domain(function(d){return d.Institution})
        .range(d3.schemeSet3);
    
    var color_scale = d3.scaleOrdinal()
                        .domain(function(d){ return d.Discipline })
                        .range(["#f90da0", "#25b8ea", "#e9c338", "#40e18c", "#bb4ca2", "#489260", "#f24219", "#b3dfc1", 
                        "#746cc4", "#a7e831", "#8b56f0", "#b8b2f0", "#a9681c", "#4cf32c", "#bc1cfa", "#f09bf1"])
    
    var color = d3.scaleLinear()
                  .domain([0, 3])
                  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
                  .interpolate(d3.interpolateHcl)

    // select the SVG
    var svg = d3.select(this.$refs.asmdClusteringSVG)
        .attr("viewBox", "0 0 1000 1000")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("display", "block")
        .style("margin", "0 -14px")

    // draw circles for every cluster
    const node = svg.selectAll("circle")
        .data(root.descendants().slice(1)) // slice(1) removes outer circle
        .join("circle")
        //.attr("fill", d => d.children ? color(d.depth) : "white")
        // .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
        //                                 : d.data.key == "Medicine" ? "#ff0000"
        //                                 : d.data.key == "Psychology" ? "#00ff00"
        //                                 : d.depth == 1 ? color_scale(d.data.key)
        //                                 : colorO(d.data.key);
        // })
        .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                : d.depth == 2 ? color_scale(d.parent.data.key)
                                : d.depth == 1 ? color_scale(d.data.key)
                                : color0(d.data.key);
        })
        .attr("opacity", function(d){return d.depth == 3 ? 0.7
                                    : d.depth == 2 ? 0.7
                                    : d.depth == 1 ? 0.5
                                    : 1;
        })
        .on("mouseover", tooltipOn)
        .on("mouseout", tooltipOff)
        .attr("r", d => d.r)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    
    var tooltip = d3.select(this.$refs.outcomeDetail)
                    .append()
                    .attr("class", "tooltip")

                    // TODO: add this to the CSS
                    // .style("position", "absolute")
                    // .style("top", "50%")
                    // .style("left", "50%")
                    // .style("opacity", '1')
                    // .style("borderRadius", "0.25em")
                    // .style("padding", "0.7em 1em")
                    // .style("boxShadow", '0px 0px 10px rgba(0,0,0,0.1)')
                    // .style("fontSize", '0.7rem')
                    // .style("fontFamily", '"Helvetica Neue", sans-serif')
                    // .style("background", "white")
                    // .style("pointerEvents", 'none')
                    // .style("maxWidth", '11em')

    // label every circle (depending on criteria)
    // const label = svg.append("g")
    // .style("font", "18px Lato")
    // .attr("pointer-events", "all")
    // .attr("text-anchor", "middle")
    // .selectAll("text")
    // .data(root.descendants())
    // .join("text")
    //     .attr("pointer-events", "all")
    //     .style("display", d => d.parent === root ? "inline" : "none") // here's the criterion
    //     // .style("display", function(d) {return d.depth == 3 ? "none"
    //     //                     : d.depth == 2 ? "inline"
    //     //                     : d.depth == 1 ? "inline"
    //     //                     : "inline";
    //     //                     })
    //     .text(d => d.data.key)
    //     .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

},
  watch: {
    // this is our stepValue listener and we update the text with the proper
    // value whenever it is being triggered
    stepValue: function(){
      console.log("hey i'm square and i'm watching stepValue");
    }
  }
};
</script>