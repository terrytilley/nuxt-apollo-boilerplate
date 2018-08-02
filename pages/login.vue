<template>
  <div>
    <h1>Login</h1>
    <el-form ref="form" :model="form">
      <el-form-item label="Email">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mutation from '@/apollo/mutations/login.gql'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      const variables = this.form
      try {
        const token = await this.$apollo
          .mutate({ mutation, variables })
          .then(({ data }) => data && data.login)
        await this.$apolloHelpers.onLogin(token)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
