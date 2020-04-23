<template>
  <el-row>
    <el-col :span="2"><p>Misconduct component</p></el-col>
    <el-col :span="20">
      <p>Misconduct</p>
      <asmd :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span="2"><p>Misconduct again</p></el-col>
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