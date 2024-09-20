import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue", "uni-app"],
      dts: "src/auto-import.d.ts", //  会自动生成此文件
      dirs: ["./src/common/tools/**"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/css/attribute.scss";
        `,
      },
    },
  },
});
