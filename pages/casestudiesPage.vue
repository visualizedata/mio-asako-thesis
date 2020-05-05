<template>
  <div>
    <el-row>
      <el-col :span= "24">
        <casestudies :caseStudyData=loadedCaseStudies :stepValue=stepValue />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange="propagateStepChange" :labels="stepLabels" :stepValue=stepValue />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import casestudies from '~/components/casestudies.vue'
import steps from '~/components/steps.vue'
import loadedCaseStudies from "~/static/case_studies.json";

export default {
  data() {
    return{
      loadedCaseStudies: loadedCaseStudies,
      stepValue: 1,
      stepLabels: ["sdf", "sdfsdf", "sdf3453"]
    };
  },
  components: {
      casestudies,
      steps
  },
  methods: {
    // this propagates the value and also changes the color
    propagateStepChange: function(value){
      console.log("propagateStepChange: " + value)
      //this.changeColor();
      this.stepValue = value;
    }
  },
  mounted(){

  }
};
</script>

<style>
body {
  font: 10px sans-serif;
  position: relative;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  min-height: 36px;
}

svg{
  display: block;
  margin: auto;
  float: right;
}

</style>