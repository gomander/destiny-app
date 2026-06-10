import { defineConfig } from '#q-app/wrappers'
import { version } from './package.json'

const VERSION = version.split('.')[0]

export default defineConfig(() => ({
  boot: [],
  css: ['app.css'],
  extras: [
    'fontawesome-v7',
    'roboto-font'
  ],
  build: {
    vueRouterMode: 'history',
    env: { VERSION },
    polyfillModulePreload: true,
    extendViteConf (viteConf) {
      viteConf.build ??= {}
      viteConf.build.rollupOptions ??= {}
      viteConf.build.rollupOptions.output ??= {}
      const { output } = viteConf.build.rollupOptions
      if (Array.isArray(output)) {
        for (const o of output) {
          o.entryFileNames = `assets/[name]-v${VERSION}.js`
          o.chunkFileNames = `assets/[name]-v${VERSION}.js`
        }
      } else {
        output.entryFileNames = `assets/[name]-v${VERSION}.js`
        output.chunkFileNames = `assets/[name]-v${VERSION}.js`
      }
    },
    typescript: {
      strict: true,
      vueShim: true
    }
  },
  devServer: {
    https: true,
    open: true
  },
  framework: {
    config: {
      dark: 'auto',
      notify: { position: 'top', progress: true },
      brand: {
        primary: '#1383a8',
        darci: '#1595c0',
        secondary: '#29afa6',
        accent: '#6027b0',
        positive: '#21ba47',
        negative: '#c11949',
        info: '#57c6eb',
        warning: '#f1c64f'
      }
    },
    iconSet: 'fontawesome-v7',
    lang: 'en-US',
    plugins: ['Dialog', 'Loading', 'Notify', 'AppFullscreen']
  },
  animations: []
}))
