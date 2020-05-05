<template>
  <div>
    <el-row>
      <el-col :span="24">
        <asmd :asmdData=loadedAsmdData />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps :labels=stepLabels />
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
      stepLabels: ["Misconduct Step 1", "Miscondit Step 2", "misonduct Step 3"]
    };
  },
  components: {
    asmd,
    steps
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