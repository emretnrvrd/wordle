import Vue from "vue";
import store from "./store/index";
// import storeMixin from "./mixins/store";
import App from "./App.vue";

// Vue.mixin(storeMixin);

const files = require.context('./components', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");