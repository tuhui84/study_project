import copy from "./modules/copy";
import longpress from "./modules/longpress";
import debounce from "./modules/debounce";
import waterMarker from "./modules/waterMarker";
import permission from "./modules/permission";
const directives = {
  copy,
  longpress,
  debounce,
  waterMarker,
  permission
};
export default {
  install(Vue) {
    Object.keys(directives).forEach(item => {
      Vue.directive(item, directives[item]);
    });
  }
};
