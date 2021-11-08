import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'


function generatePdfDiff() {

  return {
    name: 'vite-plugin-genereate-pdf-diff', // required, will show up in warnings and errors
    apply: 'serve',
    resolveId(id) {
      // console.info("Resolve ID: ", id);
    },
    load(id) {
      // console.info("Load: ", id);
    },
    handleHotUpdate(ctx) {
      console.info("Event: Send Custom Event");
      ctx.server.ws.send({
        type: 'custom',
        event: 'generate-pdf',
        data: 'test'
      })
      return;
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [generatePdfDiff(), vue(), Inspect()],
  server: {
    watch: {
      ignored: ["**/test/**", "**/public/diff.pdf"],
    },
  },
})
