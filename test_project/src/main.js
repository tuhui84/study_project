// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";
import htmlToPdf from "./util/htmlToPdf";
import fabric from "fabric";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Directives from "./util/directives/index";
Vue.use(Directives);
Vue.use(Antd);
Vue.use(htmlToPdf);
Vue.config.productionTip = false;
Vue.prototype.$get = function(url, data, callback) {
  Vue.axios
    .get(host + url, {
      params: data
    })
    .then(res => {
      callback(res.data);
    });
};
Vue.prototype.$post = function(url, data, callback) {
  Vue.axios
    .post({
      url: host + url,
      method: "POST",
      data: data
    })
    .then(res => {
      callback(res.data);
    });
};
Vue.use(VueAxios, axios);
Vue.use(fabric);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
