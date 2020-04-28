<template>
  <div>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">
          A Lesson in Perseverence: <br/> Women in STEM 
          </h1>
          <h2 class="subtitle">
            Overcoming sexual misconduct, harassment, and discrimination in STEM Academia
          </h2>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
          <h2 class = "header">Introduction</h2>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
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

<style scoped>
body {
  background: rgb(179,179,255);
  background: linear-gradient(90deg, rgba(179,179,255,1) 0%, rgba(255,179,179,1) 100%);
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: Lato, 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 72px;
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

.header{
  justify-content: center;
  text-align: center;
}

.links {
  padding-top: 15px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content{
  border-radius: 4px;
  min-height: 36px;
}

</style>
