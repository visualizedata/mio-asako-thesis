<template>
  <el-row>
    <el-col :span= "24">
      <h2 style = "text-align: center">square experiments</h2>
      <square :caseStudyData=loadedCaseStudies :colorToggled=colorToggled />
      <el-button v-on:click = "changeColor">Change color</el-button>
    </el-col>
  </el-row>
</template>

<script>

import square from '~/components/square.vue'

import loadedCaseStudies from "~/static/case_studies.json";

export default {
  data() {
    return {
      // some dataset
      loadedCaseStudies: loadedCaseStudies,
      // a color to be changed in this page, but utilized in the child component
      colorToggled: "#ff0000"
    };
  },
  components: {
      square
  },
  methods: {
    // this toggles this.colorToggled (and vue propagates this change automatically to the children)
    changeColor: function(event){
          console.log("changeColor 🤪");
          this.colorToggled === "#ff0000" ? this.colorToggled = "#00ff00" : this.colorToggled = "#ff0000";
      }
  }
};
</script>

<style>
.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;
}

.svg{
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
}

.el-button{
  position:absolute;
  bottom: 5vh;
  left: 50%
}
</style>