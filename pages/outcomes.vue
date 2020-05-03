<template>
  <el-row>
    <el-col :span= "24">
      <clusters :asmdData=loadedAsmdData />
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

svg{
  display: block;
  margin: auto;
}

</style>