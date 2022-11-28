<template>
  <a-layout class="a-layout">
    <a-layout-header class="a-layout-header" collapsible>
      <!-- logo -->
      <div class="a-layout-header__l">
        <icon name="logo-prefix" class="logo-prefix">111</icon>
        <icon name="logo_text" class="logo-main">1112121</icon>
      </div>
      <!-- 一级菜单（水平） -->
      <a-menu v-model="menuLevel_1" mode="horizontal" theme="dark">
        <template v-for="item in horizontalMenu">
          <a-menu-item
            v-if="!item.hidden"
            :key="item.id"
            @click="toRoute(item, item.id)"
          >
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="verticalMenu.length > 1"
        class="a-layout-sider"
        theme="dark"
      >
        <!-- 侧边栏菜单 -->
        <a-menu
          :selectedKeys="[defaultValue]"
          :inline-collapsed="collapsed"
          :inlineCollapsed="true"
          mode="inline"
          theme="dark"
          :open-keys.sync="openKeys"
        >
          <template v-for="item in verticalMenu">
            <sub-menu
              v-if="item.children && item.children.length && !item.hidden"
              :key="item.name"
              :menu-info="item"
            />
            <a-menu-item v-else-if="!item.hidden" :key="item.id">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </a-menu>
        <!-- 展开/收起侧边栏菜单的按钮 -->
        <div class="a-layout-sider__toggle" @click="collapsed = !collapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </div>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import store from "storejs";

import { Menu } from "ant-design-vue";
let page = store.get("page") || 1;
const SubMenu = {
  template: `
      <a-sub-menu key="aslfnafal" v-bind="$props" v-on="$listeners" >
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="(item,index) in menuInfo.children" >
          <sub-menu v-if="item.children&&item.children.length" :key="item.name" :menu-info="item"   />
          <a-menu-item v-else :key="item.path" @click=tabChange(item) >
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  data() {
    return {};
  },
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    tabChange(item) {
      this.$router.push(item.path);
    },
  },
};
export default {
  name: "layout",
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      // 避免Vue为horizontalMenu设置响应式
      // Vue的响应式会忽略冻结的对象
      horizontalMenu: Object.freeze(store.get("tree")),
      menuLevel_1: [page],
      collapsed: false,
      openKeys: ["ProjectLists"],
      defaultValue: "/projectManagement/ProjectLists/ProjectList/1",
    };
  },
  computed: {
    verticalMenu() {
      return this.horizontalMenu.find((item) => item.id === this.menuLevel_1[0])
        .children;
    },
  },

  methods: {
    toRoute(item, id) {
      store.set("page", id);
      this.$router.push({ name: item.name });
    },
  },
  watch: {
    $route(newRoute) {
      this.defaultValue = newRoute.path;
    },
  },
};
</script>

<style lang="scss" scoped>
#bgc {
  background-color: #001529;
}
.a-layout {
  height: 100vh;
  &-header {
    display: flex;
    height: 48px;
    padding: unset;
    &__l {
      width: 208px;
      height: 48px;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      .logo-prefix {
        font-size: 30px;
      }
      .logo-main {
        width: 128px;
        height: 50px;
        color: #fff;
      }
    }
    .ant-menu-horizontal {
      line-height: 48px;
    }
  }
  .a-layout-sider {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    .ant-menu-item {
      span {
        width: 4em;
        // background: red;
        display: inline-block;
      }
    }
    &__toggle {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .anticon {
        font-size: 16px;
      }
    }
  }
}
</style>
