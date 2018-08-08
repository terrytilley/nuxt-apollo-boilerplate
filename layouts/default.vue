<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>
    <el-container>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  },
}
</script>

<style scoped>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #222;
}
</style>
