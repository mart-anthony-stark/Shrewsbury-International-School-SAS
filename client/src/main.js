import { createApp } from "vue";
import App from "./App.vue";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
// import global styles
import "./index.css";
import router from "./router/index";

createApp(App).use(router).mount("#app");
