<template>
  <div class="container">
    <div class="title"></div>
    <div class="register">
      <div class="reg-title">
        <div>注册</div>
      </div>
      <div class="userName RegIpt">
        <a-input
          v-model="reg.userName"
          placeholder="请输入用户名"
          @blur="verificationUser"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
        <div v-show="regBol.userbol" style="color: red">用户名格式不正确</div>
      </div>
      <div class="userEmail RegIpt">
        <a-input v-model="reg.userEmail" placeholder="请输入邮箱">
          <a-icon slot="prefix" type="mail" />
        </a-input>
        <div v-show="regBol.emailBol" style="color: red">邮箱格式不正确</div>
      </div>

      <div class="verificationCode RegIpt">
        <a-input
          v-model="reg.verificationCode"
          placeholder="验证码"
          @blur="verCode"
        >
          <a-icon slot="prefix" type="safety-certificate" />
        </a-input>
        <button class="gain" @click="getCode">获取验证码</button>
        <div style="color: red" v-show="regBol.Code">验证码输入不正确</div>
      </div>
      <div class="password RegIpt">
        <a-input v-model="reg.password" placeholder="设置密码">
          <a-icon slot="prefix" type="unlock" />
        </a-input>
      </div>
      <div class="confirmPassword RegIpt">
        <a-input v-model="reg.confirmPassword" placeholder="确认密码">
          <a-icon slot="prefix" type="unlock" />
        </a-input>
      </div>
      <button class="regBtn" @click="submitReg">注册</button>
    </div>
  </div>
</template>

<script>
/* 
/*
注册流程
当用户注册输入用户名之后，需要检测该用户名是否已经注册过 /api/v1/users/exists_user_unique_fields
如果注册过则提醒用户(报错)
如果没有注册过则用户可以继续输入接受验证码的邮箱地址
当用户输入完邮箱地址后 需要立刻校验 用户名和密码是否已经注册过
如果注册过则提醒用户(报错)
如果没有注册过则向指定邮箱发送邮件 /api/v1/verification_codes
用户可以继续输入验证码(邮件中)
继续输入密码(密码需要符合规范)长度在6-15之间 需要英文数字混用
如果不符合要求报错
*/

import {
  registerVerUser,
  VerUserCode,
  register,
  isCodeRight,
} from "@/service/user";
export default {
  name: "Register",
  data() {
    return {
      regBol: {
        userbol: false,
        emailBol: false,
        Code: false,
        pwd: false,
        confimPwd: false,
      },
      reg: {
        userName: "",
        userEmail: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    submitReg() {
      //   isCodeRight(this.reg.userEmail, this.reg.verificationCode).then(() => {
      //
      //   });
      let data = {
        code: this.reg.verificationCode,
        email: this.reg.userEmail,
        password: this.reg.password,
        passwordConfirm: this.reg.confirmPassword,
        username: this.reg.userName,
        verification_type: 1,
      };
      register(data).then((value) => {
        console.log(value);
      });
    },
    // 验证账户是否存在
    verificationUser() {
      const userRules = /^[a-zA-Z0-9_-]{4,16}$/; // 4到16位（字母，数字，下划线，减号）
      this.regBol.userbol = !userRules.test(this.reg.userName);
      // 校验通过发送请求
      if (!this.regBol.userbol) {
        registerVerUser(this.reg.userName)
          .then((value) => {
            console.log(value);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    // 获取验证码
    getCode() {
      // 邮箱格式判断并发送邮箱验证码
      const emailRules = /^[1-9][0-9]{4,10}@qq.com$/;
      this.regBol.emailBol = !emailRules.test(this.reg.userEmail);
      if (!this.regBol.emailBol) {
        VerUserCode({
          code: "000000",
          target: this.reg.userEmail,
          type: 1,
          available: 1,
        }).then((res) => {
          console.log(res);
        });
      }
    },
    verCode() {
      isCodeRight(this.reg.userEmail, this.reg.verificationCode).then(
        (data) => {
          if (data.code === 404) {
            this.regBol.Code = true;
            console.log(this.regBol.Code);
          } else {
            this.regBol.Code = false;
          }
        }
      );
    },
  },
};
</script>

<style scoped lang="css">
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("https://g.alicdn.com/teambition/account-web/0.3.34/images/login-bg.7628d7f.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
}
.title {
  width: 144px;
  height: 52px;
  margin: 92px auto 56px;
  background-image: url("https://img.alicdn.com/imgextra/i2/O1CN01itTZWt1wHCn5Xdbq2_!!6000000006282-2-tps-624-239.png");
  background-size: 100%;
}
.register {
  width: 432px;
  height: 578px;
  margin: 0 auto;
  padding: 60px 36px;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 4px 6px rgb(0 0 0 / 10%),
    0 12px 20px rgb(38 38 38 / 12%);
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
  border-radius: 12px;
  padding: 60px 36px;
}
.reg-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 48px;
}
.RegIpt {
  margin-bottom: 20px;
}
.verificationCode {
  position: relative;
}
.gain {
  width: 100px;
  height: 20px;
  border: 1px solid rgb(100, 195, 232);
  border-radius: 5px;
  color: white;
  background-color: #409eff;
  position: absolute;
  right: 20px;
  top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.regBtn {
  width: 360px;
  height: 46px;
  border-radius: 4px;
  padding: 0 12px;
  border-style: solid;
  color: #fff;
  background-color: #1b9aee;
  font-size: 16px;
  border-color: transparent;
}
/* .isImport {
  border-radius: 4px;
  padding: 0 12px;
  border-style: solid;
  color: #fff;
  background-color: #1b9aee;
  font-size: 16px;
  border-color: transparent;
} */
#app > div > div.register > div.userName.RegIpt > span > input {
  height: 200px;
}
</style>
