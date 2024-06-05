import { createSSRApp } from "vue";
import http from "@/http/request.js";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$http = http;
  return {
    app,
  };
}
