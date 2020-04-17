<template>
  <el-row>
    <el-col :span="4"><p>Misconduct component</p></el-col>
    <el-col :span="16">
      <p>Misconduct</p>
      <asmd :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span="4"><h1>Misconduct again</h1></el-col>
  </el-row>

</template>

<script>
import asmd from '~/components/asmd.vue'

import loadedAsmdData from "~/assets/asmd_incidents.json";

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