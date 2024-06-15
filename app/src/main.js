import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Pagination from "@/components/Pagination";
import TypeNav from "@/components/TypeNav";
import "@/mock/mockServer"; // Load the mock server 一定要在这里引入，因为这样才能保证mockServer.js中的代码先执行，从而拦截请求

Vue.config.productionTip = false; // Disabling the production tip

// Registering the global component
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);

new Vue({
  render: (h) => h(App),
  router, // Add the router to the Vue instance
  store, // Add the store to the Vue instance
  beforeCreate(){
    Vue.prototype.$bus = this; // Adding a global event bus
  }
}).$mount("#app");
