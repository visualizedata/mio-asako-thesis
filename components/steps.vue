<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-steps :active="active" align-center>
                    <el-step title="Timeline"></el-step>
                    <el-step title="Timeline 2"></el-step>
                    <el-step title="Outcomes"></el-step>
                    <el-step title="Outcome w Disciplines"></el-step>
                    <el-step title="Case studies"></el-step>
                    <el-step title="Case studies ordered"></el-step>
                </el-steps> 
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
            </el-col>
            <el-col :span="4">
                <el-button class="el-button-steps" icon="el-icon-arrow-left" v-on:click="back"></el-button>
            </el-col>
            <el-col :span="4">
                <el-button class="el-button-steps" icon="el-icon-arrow-right" v-on:click="next"></el-button>
            </el-col>
            <el-col :span="8">
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1
      };
    },

    methods: {
      // changes the step, updates the "line" but also $emits the new value
      next() {
        if (this.active++ > 5){
          this.active = 1;
          // TODO: consider $emitting that we reached end of line, and we want to go to the
          // next step in the _mother_ stepper
        }

        this.$emit('stepChange', this.active)
      },
      // changes the step, updates the "line" but also $emits the new value
      back(){
        if (this.active-- < 2){
          this.active = 1;
        } 

        this.$emit('stepChange', this.active)
      },
    }
  }
</script>

<style>

.el-button-steps{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

</style>