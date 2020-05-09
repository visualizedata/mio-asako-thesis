<template>
  <div>
    <p>placeholder</p>
    </el-steps>
  </div>
</template>

<script>


export default {
  data() {
    return{
      
    };
  },
  components: {
  },methods: {
  },
  mounted(){

  var x = 20;
  var y = 50;
  var ysize = 25;
  var z = 0;
  var counter = 0;
  var sourceText = "hello my name is Mio and I like boba and mango sticky rice. He is but just one example out of hundreds of men in STEM academia who have used their status and privilege to exploit women under their guidance and/or influence. Though the #MeToo movement has finally exposed the magnitude, breadth, and uniformity of the female experience of sexual misconduct globally, and ushered in a certain perspective shift in the way perpetrators of sexual misconduct are viewed, the playing field is still woefully uneven--women still must cope with the daily hazards of unearned male dominance. Women suffer financially, psychologically, and physically, especially in environments where men still dominate the field. The National Academy of Sciences reported in 2018 that the rate of sexual harassment in STEM is second only to that of the military. ";
  var words = sourceText.split(" ");

  function setup() {
    createCanvas(400, 400);
    background(50);
    textSize(24);
    fill(255);
    
  }
  function draw() {
    //background(50);

    //textAlign(CENTER, CENTER);
    if (z < words.length && counter == 1){
      textSize(24);
      fill(255);
      if(x < 700){
        text(words[z], x, y);
        x += textWidth(words[z])+10;
      }
      else{
        x = 20; 
        y += ysize + 2;
        text(words[z], x, y);
        x += textWidth(words[z]) + 10;
        //filter(BLUR,1);
      }
      z++;
      counter = 0;
    }
    counter++;

}



}
};
</script>

<style>
</style>