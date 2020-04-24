<template>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18">
      <asmd :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span="3"></el-col>
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