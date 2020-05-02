<template>
  <div>
    <svg ref="asmdClusteringSVG"></svg>
    <div class="outcomes" ref="outcomeDetail"></div>
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

    let focus = root;
    let view;

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
        .style("display", "block")
        .style("margin", "0 -14px")

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
        .on("mouseover", tooltipOn)
        .on("mouseout", tooltipOff)

        // .on("mouseover", function() { d3.select(this).attr("opacity", "0.4"); })
        // .on("mouseover", tooltipOn)
        // .on("mouseout", function() { d3.select(this).attr("stroke", null); })
       // .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()))
        .attr("r", d => d.r)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    
    var tooltip = d3.select(this.$refs.outcomeDetail)
                    .append()
                    .attr("class", "tooltip")
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

    var tooltipOn = function(d) {

      console.log("toolTipOn: 😎")
      
      // TODO, change the appearance of the circle (ie this) ?

      // transition tooltip and write html
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      tooltip.html("<b><span style = 'font-size: 36px; color: #6767ff;'>"+ d.data.key + "</span></b>")
    }
    
    var tooltipOff = function(d) {

      console.log("toolTipOff: 😇")
      
      // TODO, change the appearance of the circle (ie this) ?
      
      // transition tooltip
      tooltip.transition()
          .duration(500)
          .style("opacity", 0);
    };
    

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
       // zoomTo([root.x, root.y, root.r * 2]);

},
  watch: {
  }
};
</script>