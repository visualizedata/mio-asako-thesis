<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <!--<logo />-->
        <h1 class="title">
         A Lesson in Perseverence: Women in STEM 
        </h1>
        <h2 class="subtitle">
          Overcoming sexual misconduct, harassment, and discrimination in STEM Academia
        </h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  components: {
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
  color: #ffffff;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: px;
  color: #ffffff;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
