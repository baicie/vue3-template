import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import postcsspxtoviewport from 'postcss-px-to-viewport';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
// 是否引入CDN
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    visualizer({
      open: true
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
