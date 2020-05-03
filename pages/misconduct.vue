<template>
  <el-row>
    <el-col :span="24">
      <asmd :asmdData=loadedAsmdData />
    </el-col>
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
svg{
  display: block;
  margin: auto;
}
</style>