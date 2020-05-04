<template>
  <div>
    <el-row>
      <el-col :span= "24">
        <casestudybars :caseStudyData=loadedCaseStudies />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <steps />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import casestudybars from '~/components/casestudybars.vue'
import steps from '~/components/steps.vue'
import loadedCaseStudies from "~/static/case_studies.json";

export default {
  data() {
    return{
      loadedCaseStudies
    };
  },
  components: {
      casestudybars,
      steps
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

svg{
  display: block;
  margin: auto;
  float: right;
}

</style>