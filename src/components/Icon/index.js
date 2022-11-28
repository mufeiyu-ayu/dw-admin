((ctx) => ctx.keys().map(ctx))(require.context("@/svg", false, /\.svg$/));
import Icon from "./main.vue";
Icon.install = (Vue) => Vue.component("icon", Icon);
export default Icon;
