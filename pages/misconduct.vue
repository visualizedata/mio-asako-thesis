<template>
  <div>
    <el-row>
      <el-col :span="24">
        <asmd :asmdData=loadedAsmdData />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps />
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
      loadedAsmdData
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