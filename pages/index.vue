<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <!--<logo />-->
        <h1 class="title">
          Sexual misconduct, harassment, and discrimination in STEM academia
        </h1>
        <h2 class="subtitle">
          How have women overcome hardships in STEM academia? (title tbd)
        </h2>
        <div class="links">
          <p>dfdfdff</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="12">
        <div>
          <h2>
            Introduction
          </h2>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: ##696969;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 20px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
