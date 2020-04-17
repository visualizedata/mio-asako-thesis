<template>
  <div>
    <h2>ASMD test</h2>
    <ul>
      <li v-for="(asmd, index) in asmdData" :key="index">{{asmd.Person}} ({{asmd.Institution}})</li>
    </ul>
  </div>
</template>

<style>
</style>

<script>
import * as d3 from "d3";

export default {
  name: "asmd",
  data(){
    return{}
  },
  props: {
    asmdData: {
      type: Array,
      required: true
    }
  },
  methods: {},
  computed: {},
  mounted() {

     console.log("ASMD mounted 😷");
     console.log(JSON.stringify(this.asmdData));

  }
};
</script>

