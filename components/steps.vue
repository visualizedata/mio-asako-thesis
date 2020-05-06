<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-steps :active="active" align-center>
                    <el-step v-for="label in labels" :title="label" :key="label"></el-step>
                </el-steps> 
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
            </el-col>
            <el-col :span="4">
                <el-button type = "info" class="el-button-steps" icon="el-icon-arrow-left" v-on:click="back"></el-button>
            </el-col>
            <el-col :span="4">
                <el-button type = "info" class="el-button-steps" icon="el-icon-arrow-right" v-on:click="next"></el-button>
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
        active: 0
      };
    },
    props: {
      labels: {
          type: Array,
          required: true
      }
    },
    methods: {
      // changes the step, updates the "line" but also $emits the new value
      next() {
        if (this.active < this.labels.length - 1){
          this.active = this.active + 1;
        }
        this.$emit('stepChange', this.active)
      },
      // changes the step, updates the "line" but also $emits the new value
      back(){
        if (this.active > 0){
          this.active = this.active - 1;
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
  background-color: #333333;
}

.el-step__title.is-finish {
  color:#ff6767;
}

.el-step__title.is-process {
  color:#ff6767;
}

.el-step__title.is-wait {
  color:#626262;
}

.el-step__head.is-finish{
  color: #ff6767;
  border-color: #ff6767;
}

.el-step__head.is-process{
  color: #ff6767;
  border-color: #ff6767;
}

.el-step__head.is-wait{
  color: #ff6767;
  border-color: #ff6767;
}

</style>