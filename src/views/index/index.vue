<!-- 工作台 -->
<template>
  <div>
    <div class="workHeader">
      <div class="item">
        <img src="@/assets/user.jpg" alt="" />
        <span>上午好，lihaoran,祝你早日发财,多娶几个老婆</span><br />
        <span class="user">管理员</span>
      </div>
      <div class="item">
        <div class="allNums">项目总数</div>
        <div class="num">2</div>
      </div>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left-header">
          <span>进行中的项目</span>
          <span>全部项目</span>
        </div>
        <div class="main-data">
          <div class="main-data-item" v-for="item in list" :key="item.id">
            <img :src="item.cover" alt="" />
            <div>{{ item.name }}</div>
            <div>暂无介绍</div>
            <div class="main-data-item-info">
              <span>admin</span>
              <span>{{ item.created_at }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-header">
          <span>我的认任务-0</span>
          <a-select v-model="current" style="width: 20%">
            <a-select-option value="rmb">RMB</a-select-option>
            <a-select-option value="dollar">Dollar</a-select-option>
          </a-select>
        </div>
        <div class="main-right-data">
          <a-tabs default-active-key="2">
            <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="apple" />
                我执行的
              </span>
              Tab 1
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab">
                <a-icon type="android" />
                我参与的
              </span>
              Tab 2
            </a-tab-pane>
            <a-tab-pane key="3">
              <span slot="tab">
                <a-icon type="android" />
                我创建的
              </span>
              Tab 3
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRunProject } from "@/service/workbench/runProject";
export default {
  mounted() {
    getRunProject().then(({ data }) => {
      this.list = data.rows.map((item) => {
        if (item.cover.includes("/public")) {
          item.cover = item.cover.replace("/public", "");
        }
        return item;
      });
    });
  },
  data() {
    return {
      current: "未完成",
      list: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.workHeader {
  position: relative;
  padding: 0 10px;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user {
      position: absolute;
      top: 69%;
      font-size: 12px;
      left: 6%;
      color: #b0b0b0;
    }
    .allNums {
      margin-left: -20px;
      color: #b0b0b0;
      font-size: 12px;
    }
    .num {
      font-size: 22px;
      font-weight: bold;
    }
  }
}
.main {
  margin-top: 20px;
  .main-left {
    float: left;
    width: 60%;
    height: 584px;
    background-color: #fff;
    .main-left-header {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      display: flex;
      border-bottom: 2px solid #e8e8e8;
      justify-content: space-between;
    }
    .main-data {
      display: flex;
      flex-wrap: wrap;
      .main-data-item {
        border: 2px solid #b0b0b0;
        margin-right: 10px;
        width: 200px;
        img {
          width: 100%;
          height: 120px;
        }

        .main-data-item-info {
          display: flex;
          justify-content: space-between;
          border-top: 2px solid #b0b0b0;
          height: 30px;
        }
      }
    }
  }
  .main-right {
    float: right;
    width: 38%;
    height: 584px;
    background-color: #fff;
    .main-right-header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
  }
}
</style>
