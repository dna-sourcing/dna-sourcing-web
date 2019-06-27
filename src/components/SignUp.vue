<template>
  <div class="sign">
    <div class="sign_box">
      <i @click="$router.push({ path:'/'})" class="tohome el-icon-upload"></i>
      <div class="title">
        <span class="active">Sign Up</span>/
        <span @click="$router.push({ path:'/signin'})">Sign In</span>
      </div>
      <div class="form_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Sign Up</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],

      },
      dnaId: '',
      access_token: ''
      // sessionStorage.setItem("ontid", response.ontid);
      // sessionStorage.setItem("access_token", response.access_token);
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert('submit!');
          this.createDNAID()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async createDNAID() {
      try {
        let result = await this.$http.post(process.env.API_ROOT + '/api/v1/dnaid/create', this.ruleForm)
        console.log('signresult', result)
        if (result.data.desc === 'SUCCESS' && result.data.result) {
          this.dnaId = result.data.result
          this.createJWT()
          // let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJkaWQ6b250OkFVRG11NEoyVzF2cUpIRHRMUDhVeEhhdWoyZUtzUUh4dTYiLCJpc3MiOiJkaWQ6b250OkFhdlJRcVhlOVByYVY1dFlnQnF2VjRiVXE4TFNzdmpjV1MiLCJleHAiOjE1NTcyODM2MTAsImlhdCI6MTU1NzE5NzIxMCwianRpIjoiYmQ5NTZhNGI1YzYxNGYxN2I2YTgxNDkyZDI5NDIyYTQiLCJjb250ZW50Ijp7InR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJvbnRpZCI6ImRpZDpvbnQ6QWExWFBhcEpIR0dqSFF0TjJIZHliOUFQdjdIZmlZeHRSeiJ9fQ.MDFiMjFkMjg5OGJmYjZlZGQzMmM5ZjY0ZWIxMDA0OGYxNGNkOGE2MTBhYTZmZGNiZTg4OWQyNzI0MjMwZDVjMjk3Y2Q3ZDhjMzlhOGYzZDJkYjE1YzFhMTcxM2Y3OTU4ZjkzYzRjOGI2NmU2ODM5YmFhNjE4NWRjMTlkZjU3YThkYQ"
          // sessionStorage.setItem("ontid", this.dnaId);
          // sessionStorage.setItem("access_token", access_token);
          // this.$router.push({ path: '/' })
        } else {
          this.$message({ type: 'error', message: result.data.desc });
          return
        }
      } catch (error) {
        this.$message({ type: 'error', message: error });
        throw error
      }
    },
    async createJWT() {
      try {
        let result = await this.$http.post(process.env.API_ROOT + 'api/v1/dnaid/token', { user_ontid: this.dnaId })
        console.log('jwt', result)
        if (result.data.desc === 'SUCCESS' && result.data.result) {
          this.access_token = result.data.result.access_token
          sessionStorage.setItem("ontid", this.dnaId);
          sessionStorage.setItem("access_token", this.access_token);
          console.log('a')
          this.$router.push({ name: "Home" })
          console.log('b')
          this.$message({ type: 'success', message: 'Successful' });
        } else {
          this.$message({ type: 'error', message: result.data.msg });
          return
        }
      } catch (error) {
        this.$message({ type: 'error', message: error });
        throw error
        return
      }
    }
  }
}
</script>

<style lang='less' scoped>
.sign {
  .sign_box {
    width: 500px;
    // height: 400px;
    // background: #ccc;
    box-shadow: 0 0 10px #ccc;
    margin: 200px auto;
    padding: 40px;
    .tohome {
      font-size: 40px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .title {
      line-height: 50px;
      font-size: 30px;
      color: #000;
      text-align: center;
      font-weight: 800;
      span {
        cursor: pointer;
      }
      span.active {
        color: #409eff;
      }
    }
    .form_box {
      margin-top: 40px;
      //   height: 200px;
      //   background: #000;
    }
  }
}
</style>
