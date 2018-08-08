<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div>
          <h1>Sign Up</h1>
          <el-form ref="signUpForm" :model="form" :rules="rules">
            <el-form-item label="Username" prop="username">
              <el-input v-model="form.username" type="text" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" type="email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('signUpForm')">Submit</el-button>
            </el-form-item>
            <el-alert
              v-if="errorMessage"
              :title="errorMessage"
              :closable="false"
              type="error"/>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mutation from '@/apollo/mutations/signup.gql'

export default {
  name: 'SignUpPage',
  middleware: 'public',
  data() {
    return {
      errorMessage: '',
      form: {
        username: '',
        email: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: 'Please input a username', trigger: 'blur' },
          {
            min: 3,
            message: 'Username should be at least 3 characters long',
            trigger: 'blur',
          },
        ],
        email: [
          { type: 'email', message: 'Not a valid email address', trigger: 'blur' },
          { required: true, message: 'Please input your email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input a password', trigger: 'blur' },
          {
            min: 8,
            message: 'Password should be at least 8 characters long',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        const variables = this.form

        if (valid) {
          try {
            const token = await this.$apollo
              .mutate({ mutation, variables })
              .then(({ data }) => data && data.signup)

            await this.$apolloHelpers.onLogin(token)

            this.$store.commit('auth/isAuthUpdate', true)
            this.$router.push('/')
          } catch (e) {
            this.errorMessage = e.graphQLErrors[0].message
          }
        }

        return false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
