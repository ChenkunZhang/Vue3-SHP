import Vue from "vue";
import VueRouter from "vue-router";

// Tell Vue to use the router
Vue.use(VueRouter);

// Import the pages
import routes from "./routes";

//需要重写VueRouter.prototype原型对象身上的push|replace方法
let originPush = VueRouter.prototype.push; //保存原始的push方法
let originReplace = VueRouter.prototype.replace; //保存原始的replace方法

//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  //push方法有三个参数
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有传递第二个参数|第三个参数（箭头函数）
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype的replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// Create a new router instance
export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 };
  },
});
