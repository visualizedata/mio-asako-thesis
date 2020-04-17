<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><NuxtLink to="/">HOME</NuxtLink></el-menu-item>
            <el-menu-item index="2"><NuxtLink to="/misconduct">MISCONDUCT CASES</NuxtLink></el-menu-item>
            <el-menu-item index="3"><NuxtLink to="/misconduct">NETWORKS</NuxtLink></el-menu-item>
            <el-menu-item index="4"><NuxtLink to="/misconduct">PAPER TRAILS</NuxtLink></el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<style scoped>
    .line{
        stroke: red;
    }
</style>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>