<template>
  <div>
    <el-row>
      <el-col :span="24">
        <outcomes :asmdData=loadedAsmdData :stepValue=stepValue />
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
import outcomes from '~/components/outcomes.vue'
import steps from '~/components/steps.vue'

import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData,
      //start value for stepper
      stepValue: 1,
      stepLabels: ["general outcomes", "good", "bad", "disciplines", "explore"]
    };
  },
  components: {
      outcomes,
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
.node {
  box-sizing: border-box;
  line-height: 1em;
  overflow: hidden;
  position: absolute;
  white-space: pre;
  color: #333333;
}

.node-label,
.node-value {
  margin: 4px;
}

.node-value {
  margin-top: -2px;
}

.node-value {
  font-weight: bold;
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

</style>