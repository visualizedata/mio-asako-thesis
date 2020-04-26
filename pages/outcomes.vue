<template>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18">
        <p>clustering test</p>
      <clusters :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>

</template>

<script>
import clusters from '~/components/clusters.vue'

import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData
    };
  },
  components: {
      clusters
  },
  mounted(){

  }
};
</script>

<style>
</style>