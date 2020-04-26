<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color = "#333333" text-color = "#fff" active-text-color = "#ff6767">
            <el-menu-item index="1"><NuxtLink to="/">HOME</NuxtLink></el-menu-item>
            <el-menu-item index="2"><NuxtLink to="misconduct">CHRONOLOGY</NuxtLink></el-menu-item>
            <el-menu-item index="3"><NuxtLink to="outcomes">OUTCOMES</NuxtLink></el-menu-item>
            <el-menu-item index="4"><NuxtLink to="misconduct">CASE STUDIES</NuxtLink></el-menu-item>
            <el-menu-item index="5"><NuxtLink to="misconduct">CELEBRATION</NuxtLink></el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

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