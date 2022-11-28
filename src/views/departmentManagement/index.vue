<template>
  <div class="departmentManagement">
    <div class="container-left">
      <div class="container-left-header">
        <a-input placeholder="Basic usage" class="ipt" />
      </div>
      <div class="allPeoples">成员</div>
      <div class="classify">
        <div
          class="classify-item"
          v-for="(item, index) in initData"
          :key="item.id"
          @click="changeTab(index)"
          :class="{ active: index === page1 }"
        >
          <icon :name="item.icon" class="icon"></icon>
          <span :class="{ mlf: index === 4 }">{{ item.value }}</span>
          <span v-if="index == 4" class="createDepartment">
            <icon name="jiahao" class="icon iconActive"></icon>
            <span @click="showModal">创建部门</span>
          </span>
        </div>

        <div
          class="classify-item"
          v-for="(item, index) in fetchS"
          :key="item.id"
          :class="{ active: index === page2 }"
          @click="changefetchS(item.id, index)"
        >
          <icon name="data-connection" class="icon"></icon>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div>
        <commonModule
          :visible="visible"
          @fetchsChange="fetchsChange"
          :title="title"
        />
      </div>
    </div>
    <div class="container-right">
      <div class="container-item" :class="{ active: true }">
        <div class="item-header">
          <div allPeople>
            <span>所有成员 </span>
            <span>{{ allPeople.length }}</span>
          </div>
          <div class="departmentSetting">
            <div @click="addPerson">
              <icon name="tianjiahaoyou_o" class="act"></icon>
              <span>添加成员</span>
              <addPerson :visibles="visibles" />
            </div>
            <div @click="openRemovedepartment">
              <icon name="shanchu" class="act"></icon>
              <span>删除部门</span>
              <removedepartmentVue
                :removeVisibles="removeVisibles"
                @closeRemoveModel="closeRemoveModel"
              />
            </div>
            <div @click="exitsDeartment">
              <icon name="bianjishuru-xianxing" class="act"></icon>
              <span>编辑部门</span>
            </div>
          </div>
        </div>
        <div class="container-data" v-for="item in allPeople" :key="item.id">
          <div class="data-item">
            <img :src="item.avatar" alt="" />
            <div class="info">
              <div>{{ item.username }}</div>
              <div>{{ item.email }} {{ item.department?.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import removedepartmentVue from "./removedepartment.vue";
import commonModule from "./commonModule.vue";
import addPerson from "./addPerson.vue";
import CollectionFrom from "@/service/departmentManagement";
import { fetch, renderFetchs } from "@/service/departmentManagement";
export default {
  components: { addPerson, commonModule, removedepartmentVue },
  created() {
    CollectionFrom[0]().then((res) => {
      this.allPeople = res.data.rows;
    });
    fetch().then((res) => {
      this.fetchS = res.data.rows;
    });
  },
  data() {
    return {
      allPeople: [],
      fetchS: [],
      initData: [
        { id: 1, value: "所有成员", icon: "renyuanguanli" },
        { id: 2, value: "新加入的成员", icon: "xinyonghu" },
        { id: 3, value: "未分配部门的成员", icon: "renyuan" },
        { id: 4, value: "停用的成员", icon: "jinzhisousuox" },
        { id: 5, value: "部门", icon: "111" },
      ],
      page1: 0,
      page2: "",
      visible: {
        visible: false,
      },
      visibles: {
        visible1: false,
      },
      removeVisibles: false,
      title: "创建部门",
    };
  },
  methods: {
    changeTab(index) {
      if (this.page2 || this.page2 === 0) this.page2 = "";
      if (index !== 4) {
        this.page1 = index;
        CollectionFrom[index]().then((res) => {
          this.allPeople = res.data.rows;
        });
      }
    },
    showModal() {
      this.title = "创建部门";
      this.visible.visible = true;
    },
    // 部门
    changefetchS(id, index) {
      if (this.page1 || this.page1 === 0) this.page1 = "";
      renderFetchs(id).then((res) => {
        this.page2 = index;
        this.allPeople = res.data.rows;
      });
    },
    // 添加成员
    addPerson() {
      this.visibles.visible1 = true;
    },
    fetchsChange(value) {
      this.fetchS = value;
    },
    exitsDeartment() {
      this.title = "编辑";
      this.visible.visible = true;
    },
    //删除部门
    openRemovedepartment() {
      this.removeVisibles = true;
    },
    closeRemoveModel(value) {
      this.removeVisibles = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.departmentManagement {
  width: 1140px;
  background-color: #fff;
  margin: 20px auto;
  display: flex;
  height: 100%;
  .container-left {
    padding: 20px;
    border-right: 1px solid #e8e8e8;
    width: 25%;
    .container-left-header {
      display: flex;
      justify-content: center;
      width: 100%;
      .ipt {
        width: 230px;
      }
    }
    .allPeoples {
      margin-top: 10px;
      color: #b0b0b0;
      .pos {
        position: absolute;
        top: 23.5%;
        left: 25.5%;
        color: #1890ff;
      }
    }
    .classify,
    .classify1 {
      position: relative;
      width: 109%;
      margin: 2px 0 10px;

      .classify-item {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        .icon {
          font-size: 20px;
          transform: translateY(4psx);
        }
        span {
          margin-left: 13px;
        }
        .mlf {
          margin-left: -20px;
        }
        .createDepartment {
          margin-left: 100px;
          color: #1890ff;
          .iconActive {
            transform: translateX(10px);
          }
        }
      }
      .classify-item.active {
        background-color: #e6f7ff;
        border-right: 3px solid #1890ff;
      }
    }
  }
  .container-right {
    width: 100%;
    height: 100%;
    position: relative;
    .container-item {
      padding: 20px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      .item-header {
        height: 40px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: space-between;
        .departmentSetting {
          cursor: pointer;
          display: flex;
          div {
            padding-left: 20px;
            color: #1890ff;
            .act {
              color: #1890ff !important;
              font-size: 16px;
            }
          }
        }
      }
      .container-data {
        .data-item {
          height: 70px;
          align-items: center;
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .info {
            margin-left: 10px;
          }
        }
      }
    }
    .container-item.active {
      display: block;
    }
  }
}
.inputRules1 {
  padding: 0 100px;
}
.btnCreate {
  padding: 0 200px;
}
</style>
