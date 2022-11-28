import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import VueBus from "vue-bus";
import store from "./store";
import Icon from "@/components/Icon";

Vue.use(VueBus);
Vue.use(Icon);
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
