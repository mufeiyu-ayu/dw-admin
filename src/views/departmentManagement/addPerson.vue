<template>
  <div>
    <a-modal
      v-model="visibles.visible1"
      title="添加成员至部门"
      @ok="handleOk"
      width="400px"
      :footer="null"
    >
      <a-input
        placeholder="请输入用户名或邮箱查找"
        style="
           {
            'width': '200px';
          }
        "
        v-model="inputValue"
        @change="debounce"
        @search="onSearch"
      >
        <a-icon slot="prefix" type="search"
      /></a-input>
      <div class="personData">
        <div class="personData-item" v-for="item in peopleList" :key="item.id">
          <img :src="item.avatar" alt="" />
          <div class="item-des">
            <div>{{ item.username }}</div>
            <div>{{ item.email }}</div>
          </div>
          <div class="add">
            <a-button icon="usergroup-add">添加</a-button>
          </div>
          <div class="dashed"></div>
        </div>
      </div>
      <div class="pageNumber">
        <a-pagination
          :current="current"
          :showQuickJumper="false"
          :total="70"
          href="javascript:;"
          @change="onChange"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { resPeople, searchPeople } from "@/service/departmentManagement";
import debounce from "@/utils/optimize";
export default {
  props: {
    visibles: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    resPeople(0).then((res) => {
      this.peopleList = res.data.rows;
    });
  },
  data() {
    return {
      inputValue: "",
      current: 0,
      peopleList: [],
    };
  },
  methods: {
    // 关闭对话框
    handleOk() {
      this.visibles.visible1 = false;
    },
    // 点击搜索
    onSearch() {
      searchPeople(this.inputValue).then((res) => {
        this.peopleList = res.data.rows;
        console.log(this.peopleList);
      });
    },
    // 分页变化
    onChange(current) {
      resPeople(current * 6).then((res) => {
        this.current = current;
        this.peopleList = res.data.rows;
      });
    },
    debounce: debounce(function () {
      this.onSearch();
    }, 1000),
  },
};
</script>
<style lang="scss" scoped>
.pageNumber {
  display: flex;
  justify-content: center;
}
.personData {
  margin-top: 15px;
  .personData-item {
    position: relative;
    height: 60px;
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .item-des {
      margin-left: 14px;
    }
    .add {
      position: absolute;
      top: 10px;
      right: 1px;
    }
    .dashed {
      position: absolute;
      height: 1px;
      width: 330px;
      border-bottom: 1px solid #e8e8e8;
      transform: translateY(-10px);
    }
  }
}
</style>
