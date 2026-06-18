// @ts-check
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '>0.3% or last 2 versions and not dead and fully supports es6-module'
      ]
    })
  ]
}
