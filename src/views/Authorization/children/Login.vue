<template>
  <div class="login">
    <div class="login-container">
      <div class="login-user">
        <div>
          <span class="login-info">账号:</span>
          <a-input
            placeholder="请输入账号"
            v-model="user.username"
            class="login-info-active"
            @blur="leaveInputUsr"
          />
          <div class="place" v-show="isShowUser">账号格式不正确</div>
        </div>
      </div>
      <div class="login-pwd">
        <div>
          <span class="login-info">密码:</span>
          <a-input
            class="login-info-active"
            placeholder="请输入密码"
            type="password"
            v-model="user.password"
            @blur="leaveInputPwd"
          />
          <div class="place" v-show="isShowPwd">密码格式不正确</div>
        </div>
      </div>
      <div class="login-entry">
        <a-button type="primary" block class="hei" @click="submitLogin">
          登录
        </a-button>
        <a-button type="primary" block class="hei register" @click="goRegister">
          注册
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/service/user";
import { getUserMenu } from "@/service/menu";
// import router from "@/router";
export default {
  name: "Authorization",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isShowUser: false,
      isShowPwd: false,
    };
  },
  methods: {
    submitLogin() {
      // if (!this.isShowPwd && !this.isShowUser) {
      login(this.user)
        .then(() => Promise.all([getUserMenu(), getUserInfo()]))
        .then(() => this.$router.push("/index"));
      // }
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    leaveInputUsr() {
      const userRules = /^[a-zA-Z0-9_-]{4,16}$/; // 4到16位（字母，数字，下划线，减号）
      this.isShowUser = !userRules.test(this.user.username);
    },
    leaveInputPwd() {
      let pwdRules = /^(?=.*)(?=.*\d).{5,13}$/; // 至少包含字母、数字，6-13位
      this.isShowPwd = !pwdRules.test(this.user.password);
    },
  },
};
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url("https://g.alicdn.com/teambition/account-web/0.3.34/images/login-bg.7628d7f.jpg")
    no-repeat;
  background-size: cover;
  .login-container {
    position: relative;
    margin: 50px auto;
    width: 500px;
    height: 600px;
    background: #fff;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
    border-radius: 12px;
    .login-user {
      left: 27%;
      top: 18%;
      position: absolute;
      width: 300px;
    }
    .login-pwd {
      position: absolute;
      width: 300px;
      left: 27%;
      top: 35%;
    }
    .login-info {
      position: absolute;
      left: -75px;
      top: 10px;
      font-size: 30px;
    }
    .login-entry {
      position: relative;
      width: 231px;
      top: 55%;
      left: 28%;
      .hei {
        height: 50px;
      }
      .register {
        margin-top: 30px;
      }
    }
    .login-info-active {
      width: 268px;
      height: 56px;
      font-size: 17px;
    }
  }
  .place {
    color: red;
    position: relative;
    top: 13px;
    left: 8px;
  }
}
</style>
