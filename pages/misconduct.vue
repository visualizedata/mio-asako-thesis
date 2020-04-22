<template>
  <el-row>
    <el-col :span="0"><p>Misconduct component</p></el-col>
    <el-col :span="24">
      <p>Misconduct</p>
      <asmd :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span="0"><h1>Misconduct again</h1></el-col>
  </el-row>

</template>

<script>
import asmd from '~/components/asmd.vue'

import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData
    };
  },
  components: {
    asmd
  },
  mounted(){

  }
};
</script>

<style>
</style>