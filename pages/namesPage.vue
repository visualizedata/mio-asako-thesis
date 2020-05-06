<template>
  <div>
  </div>
</template>

<script>
import names from "~/static/womeninSTEM.txt";

export default {
  data() {
    return{
      names
    };
  },
  components: {
  },methods: {
  },
  mounted(){
    const names = this.names;

    const script = function (p5) {    
      // NOTE: Set up is here   
      p5.setup = _ => {      
      p5.createCanvas(p5.windowWidth, p5.windowHeight);      
      p5.background(86); 
      //var names = p5.loadStrings(names, processData)
      }

      function processData(){
        console.log(names);
      }



      // NOTE: Draw is here
      p5.draw = _ => {      
  
      }  
    }   
    // NOTE: Use p5 as an instance mode
    const P5 = require('p5');
    new P5(script)
  }
};
</script>

<style>
</style>