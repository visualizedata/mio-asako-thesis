<template>
  <div>
    <el-row>
      <el-col :span="24">
        <asmd :asmdData=loadedAsmdData :stepValue=stepValue />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange="propagateStepChange" :labels="stepLabels" :stepValue=stepValue  />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import asmd from '~/components/asmd.vue'
import steps from '~/components/steps.vue'

import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData: loadedAsmdData,
      stepValue: 1,
      stepLabels: ["All", "STEM", "misonduct Step 3"]
    };
  },
  components: {
    asmd,
    steps
  },methods: {
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
#container{
  display: block;
}

h2{
  font-family: 'Lato'

}

</style>