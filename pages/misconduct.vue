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

.tooltip {
  color: greenyellow;
  position: relative;
  text-align: left;
  /*text-transform: uppercase;*/
  max-width: 400px;
  height: auto;
  font-family: helvetica, sans-serif;
  font-size: 15px;
  background: #ffffff;
  display: inline-block;
  border: 1px solid #777777;
  /*border-radius: 5px;*/
  pointer-events: none;
  box-shadow: 0 6px 12px rgba(0,0,0,.5);
  margin: 5px;
  padding: 10px;
}

</style>