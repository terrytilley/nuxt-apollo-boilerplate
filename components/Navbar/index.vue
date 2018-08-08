<template>
  <el-menu
    :router="true"
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    text-color="#fff"
    background-color="#222"
    active-text-color="#2b90d9">
    <el-menu-item :route="{ name: 'index' }" index="1">
      <span>Home</span>
    </el-menu-item>
    <el-menu-item v-if="isAuth" :route="{ name: 'dashboard' }" index="2">
      <span>Dashboard</span>
    </el-menu-item>
    <el-menu-item v-if="!isAuth" :route="{ name: 'login' }" index="3">
      <span>Login</span>
    </el-menu-item>
    <el-menu-item v-if="isAuth" :route="{ name: 'index' }" index="4">
      <el-button type="primary" round @click.native="onLogout">Logout</el-button>
    </el-menu-item>
  </el-menu>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      activeIndex: '1',
      hasToken: !!this.$apolloHelpers.getToken(),
    }
  },
  computed: {
    ...mapState({
      isAuth: state => state.auth.isAuth,
    }),
  },
  mounted() {
    this.$store.commit('auth/isAuthUpdate', this.hasToken)

    const match = _.chain(this.$route.matched)
      .sortBy(n => n.path.length)
      .last()
      .value()
    this.activeIndex = match.path
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.$store.commit('auth/isAuthUpdate', false)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  a {
    text-decoration: none;
  }
}
</style>
