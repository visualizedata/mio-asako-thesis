<template>
  <el-row>
    <el-col :span = "4">
    </el-col>
    <el-col :span= "16">
      <h2 style = "text-align: center">PATTERNS OF MISCONDUCT CASE OUTCOMES</h2>
      <clusters :asmdData=loadedAsmdData />
    </el-col>
    <el-col :span = "4">
    </el-col>
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