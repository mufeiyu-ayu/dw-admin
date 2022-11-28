<template>
  <div class="auth">
    <div class="auth-header">
      <icon
        name="logo_text"
        style="width: 7.5em; height: 1em; font-size: 30px"
      ></icon>
      <p>项目管理协作平台</p>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Authorization",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.auth {
  user-select: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("../../assets/bg1.png");
  &-header {
    margin-top: 92px;
    margin-bottom: 20px;
    text-align: center;
    color: #1890ff;
    p {
      font-size: 18px;
    }
  }
  &-login {
    margin: 0 auto;
    padding: 60px 36px;
    width: 432px;
    height: 508px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
    box-sizing: border-box;
    .n-space {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      gap: 24px;
    }
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;
      &-content {
        font-size: 22px;
        color: #262626;
      }
      &-btn__forgot {
        text-align: center;
      }
    }
    &__more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 48px;
      height: 48px;
      .third-area {
        display: flex;
        justify-content: space-around;
        align-items: center;
        &__item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border: 2px solid #efefef;
          border-radius: 24px;
          transition: 218ms;
          box-sizing: border-box;
          cursor: pointer;
          &:hover {
            border-color: #1890ff;
            background-color: #f2fbff;
          }
        }
      }
    }
    &__agreement {
      margin-top: 48px;
      text-align: center;
      ::v-deep .ant-btn-link {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
