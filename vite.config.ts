import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgLoader from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
   server: {
      port: 3000,
      hmr: true,
   },
   plugins: [react(), svgLoader()],
   appType: "spa",
   define: {"process.env": process.env}
})
