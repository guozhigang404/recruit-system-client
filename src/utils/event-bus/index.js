import Vue from "vue";

let eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
export default eventBus;
