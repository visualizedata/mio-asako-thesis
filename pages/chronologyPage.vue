<template>
  <div>
    <el-row>
      <el-col :span="24">
        <chronology :asmdData=loadedAsmdData :stepValue=stepValue :descriptions=descriptions />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange=propagateStepChange :labels=stepLabels :stepValue=stepValue  />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import chronology from '~/components/chronology.vue'
import steps from '~/components/steps.vue'

import descriptions from '~/static/chronology_steps.json';
import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData,
      stepValue: 1,
      stepLabels: descriptions.map(v => {return v.label}),
      descriptions
    };
  },
  components: {
    chronology,
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