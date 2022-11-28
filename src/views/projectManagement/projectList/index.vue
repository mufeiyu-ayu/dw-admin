<!-- HACK 项目管理 -->
<template>
  <div class="projectManagement">
    <a-tabs :activeKey="defautlValue">
      <a-tab-pane v-for="item in tabList" :key="item.path">
        <span slot="tab" @click="changeTab(item)">
          {{ item.title }}
        </span>
        <div class="projectManagement-data">
          <div v-if="!list.length" class="bg">
            <img src="@/assets/bg3.png" alt="" />
          </div>
          <div
            class="projectManagement-item"
            v-for="item of list"
            :key="item.id"
          >
            <div class="item-left">
              <img :src="item.cover" alt="" />
              <div class="pos">
                <span>{{ item.name }}</span>
                <span>必读</span>
                <a-tag color="green"> 公开 </a-tag>
                <span class="addStyle">{{ item.intro }}</span>
              </div>
            </div>
            <div class="item-right">
              <div class="item-info">
                <div>创建日期</div>
                <div>{{ item.updated_at.slice(10) }}</div>
              </div>
              <div class="item-info">
                <div>创建人</div>
                <div>{{ item.creator.username }}</div>
              </div>
              <div class="item-info">
                <div>进度</div>
                <div style="width: 120px">
                  <a-progress :percent="item.progress" status="active" />
                </div>
              </div>
              <div class="item-info1">
                <div><icon name="renyuan" class="item"></icon></div>
                <div><icon name="shezhi" class="item"></icon></div>
                <div><icon name="shoucang" class="item"></icon></div>
                <div><icon name="shanchu" class="item"></icon></div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-button type="primary" @click="createProject" class="pos">
      +创建新项目
    </a-button>
    <div class="pro">
      <addProject
        :modal2Visible="modal2Visible"
        :projectType="projectType"
      ></addProject>
    </div>
  </div>
</template>
<script>
import store from "storejs";
import { toTree } from "@/utils";
import { createProject } from "@/service/createProject";
import { getAllProject } from "@/service/projectManagement/allProject";
import addProject from "./addProject.vue";
export default {
  components: { addProject },
  created() {
    this.tabList = toTree(store.get("userMenus"))[1].children[0].children;
  },
  mounted() {
    getAllProject("collection=0&is_recycle=0").then(({ data }) => {
      let res = data.rows.map((item) => {
        if (item.cover.includes("/public")) {
          item.cover = item.cover.replace("/public", "");
        }
        if (!item.cover.includes(".jpg")) {
          item.cover = item.cover + ".jpg";
        }
        return item;
      });
      this.list = res;
    });
  },
  data() {
    return {
      modal2Visible: { bol: false },
      list: [],
      tabList: [],
      defautlValue: "/projectManagement/ProjectLists/ProjectList/1",
      projectType: [],
    };
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
    changeTab(item) {
      this.$router.push(item.path);
    },
    createProject() {
      this.modal2Visible.bol = true;
      createProject().then((res) => {
        this.projectType = res.data.rows;
      });
    },
  },
  watch: {
    $route(newRoute) {
      this.defautlValue = newRoute.path;
    },
    // /projectManagement/ProjectLists/ProjectList/3
    defautlValue(newValue) {
      switch (newValue) {
        case "/projectManagement/ProjectLists/ProjectList/1":
          {
            getAllProject("collection=0&is_recycle=0").then(({ data }) => {
              this.list = data.rows;
            });
          }
          break;
        case "/projectManagement/ProjectLists/ProjectList/2":
          {
            getAllProject("collection=1&is_recycle=0").then(({ data }) => {
              this.list = data.rows;
            });
          }
          break;
        case "/projectManagement/ProjectLists/ProjectList/3":
          {
            getAllProject("collection=0&is_archived=1").then(({ data }) => {
              this.list = data.rows;
            });
          }
          break;
        case "/projectManagement/ProjectLists/ProjectList/4":
          {
            getAllProject("collection=0&is_recycle=1").then(({ data }) => {
              this.list = data.rows;
            });
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.projectManagement {
  position: relative;
  .pos {
    position: absolute;
    top: 1%;
    right: 1%;
  }
  .projectManagement-item {
    margin-bottom: 10px;
    // width: 300px;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-left {
      position: relative;
      img {
        height: 50px;
        width: 50px;
      }
      .pos {
        width: 300px;
        position: absolute;
        top: 1px;
        left: 54px;
        span {
          margin-left: 5px;
          padding-right: 10px;
          color: blue;
        }
        .addStyle {
          position: absolute;
          left: 1px;
          top: 28px;
          color: gray;
        }
      }
    }
    .item-right {
      display: flex;
      width: 600px;
      align-items: center;
      justify-content: space-between;
      .item-info1 {
        display: flex;
        div {
          cursor: pointer;
          margin-left: 10px;
          width: 28px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border: 1px solid pink;
          border-radius: 50%;
          .item {
            font-size: 14px;
          }
        }
      }
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    img {
      margin-left: 450px;
      margin-top: 100px;
    }
  }
}
</style>
