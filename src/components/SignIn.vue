<template>
  <div class="sign">
    <div class="sign_box">
      <i @click="$router.push({ path: '/' })" class="tohome el-icon-upload"></i>
      <div class="title">
        <span @click="$router.push({ path: '/signup' })">Sign Up</span>/
        <span class="active">Sign In</span>
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
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Sign In</el-button
            >
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
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      dnaId: "",
      access_token: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert('submit!');
          this.sign();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async sign() {
      try {
        let result = await this.$http.post(
          process.env.API_ROOT + "api/v1/dnaid/login",
          this.ruleForm
        );
        // console.log('signin', result)
        if (result.data.desc === "SUCCESS") {
          this.dnaId = result.data.result.user_dnaid;
          this.access_token = result.data.result.access_token;
          sessionStorage.setItem("ontid", this.dnaId);
          sessionStorage.setItem("access_token", this.access_token);
          this.$router.push({ path: "/" });
          this.$message({ type: "success", message: "Successful" });
        } else {
          this.$message({ type: "error", message: "Sign Fail" });
          return;
        }
      } catch (error) {
        this.$message({ type: "error", message: error });
        throw error;
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
