<template>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18">
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
body {
  font: 10px sans-serif;
  position: relative;
}
.node {
  box-sizing: border-box;
  line-height: 1em;
  overflow: hidden;
  position: absolute;
  white-space: pre;
  background: #11ff66;
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
</style>