<template>
  <div class="userManagement">
    <div class="userManagement-inner">
      <div class="header">
        <div class="header-left">
          <i class="iconfont icon-delete"></i>
          批量删除
        </div>
        <div class="header-right">
          <a-input
            placeholder="用户名/邮箱/手机"
            style="margin-right: 5px"
            v-model="search"
          />
          <a-button type="primary" @click="getUsersList()"> 查询 </a-button>
        </div>
      </div>
      <div class="main">
        <table>
          <thead>
            <tr>
              <th style="text-align: center; width: 50px"><a-checkbox /></th>
              <th>
                id
                <span style="position: relative">
                  <a-icon type="caret-up" class="aret-up" />
                  <a-icon type="caret-down" class="caret-down" />
                </span>
              </th>
              <th style="position: relative">
                昵称
                <span style="position: relative">
                  <a-icon type="caret-up" class="aret-up" />
                  <a-icon type="caret-down" class="caret-down" />
                </span>
              </th>
              <th>角色</th>
              <th style="position: relative">
                头像
                <span style="position: relative">
                  <a-icon type="caret-up" class="aret-up" />
                  <a-icon type="caret-down" class="caret-down" />
                </span>
              </th>
              <th>邮箱</th>
              <th>手机</th>
              <th>状态</th>
              <th>最近登录时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in userLists" :key="i">
              <td style="text-align: center"><a-checkbox /></td>
              <td>{{ item.id }}</td>
              <td>{{ item.username }}</td>
              <td class="role">
                <span v-for="items in item.roles" :key="items.id">
                  {{ items.name }}
                </span>
              </td>
              <td class="headImage">
                <img :src="item.avatar" alt="头像" v-if="item.avatar != ''" />
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td class="normal-color">正常</td>
              <td>{{ item.last_login }}</td>
              <td class="edit">
                <span>角色管理</span>
                <span>编辑</span>

                <span>删除</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="main-page">
          <!-- <span>共58条</span> -->
          <a-pagination
            v-model="page"
            :total="totals"
            :show-total="(total) => `共 ${total} 条`"
            show-size-changer
            show-quick-jumper
            @change="getUsersList()"
            :page-size.sync="pageSize"
            @showSizeChange="getUsersList()"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
              <span v-if="props.value === '50'"></span>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userList } from "@/service/administratorConfiguration";
export default {
  name: "userManagement",
  data() {
    return {
      page: 1, //页数
      userLists: [],
      totals: 10, //一共多少条数据
      pageSize: 10,
      search: "",
    };
  },
  methods: {
    getUsersList(
      page = (this.page - 1) * 10,
      pageSize = this.pageSize,
      search = this.search
    ) {
      userList(page, pageSize, search).then((res) => {
        this.userLists = res.data.rows;
        this.totals = res.data.count;
        console.log(this.totals);
      });
    },
  },
  created() {
    this.getUsersList();
  },
};
</script>

<style scoped lang="scss">
.main th {
  width: 150px;
  font-weight: 500;
}

// .main tbody {
//   height: 660px;
// }
.main th,
.main td,
.main tr {
  height: 66px !important;
  border-bottom: 1px solid #f0f2f7;
}
.userManagement {
  width: 100%;
  // height: 830px
  padding: 15px;
  box-sizing: border-box;
}
.userManagement-inner {
  width: 100%;
  height: 100%;
  padding: 5px 14px;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.header-left {
  background-color: #ff4d4f;
  cursor: pointer;
  padding: 5px 20px;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
}
.header-right {
  display: flex;
}

.aret-up {
  position: absolute;
  left: 10px;
  color: #c0c4cc;
}
.caret-down {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #c0c4cc;
}
.edit > span {
  display: inline-block;
  margin: 0px 3px;
  color: #1a90ff;
  cursor: pointer;
  font-size: 12px;
}
.normal-color {
  color: #71c647;
}
.role {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}
.role > span {
  background-color: #e8f4ff;
  color: #1a90ff;
  padding: 2px;
  border: 1px solid #d8ecff;
  border-radius: 2px;
  font-size: 12px !important;
  box-sizing: border-box;
}
.headImage > img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.main-page {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
