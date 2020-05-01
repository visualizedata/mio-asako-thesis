<template>
  <el-row>
    <el-col :span= "24">
      <h2 style = "text-align: center">CASE STUDIES OF MISCONDUCT CASES WITH OUTCOMES IN 2018</h2>
      <casestudybars :caseStudyData=loadedCaseStudies />
    </el-col>
  </el-row>

</template>

<script>
import casestudybars from '~/components/casestudybars.vue'

import loadedCaseStudies from "~/static/case_studies.json";

export default {
  data() {
    return{
      loadedCaseStudies
    };
  },
  components: {
      casestudybars
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