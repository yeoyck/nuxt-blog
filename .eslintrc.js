module.exports = {
    root: true,
    env: {
      node: true
    },
    globals: {
      // ref: false
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-undef': 'off', // If there is a way to export auto-imports globals, den turn this on
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'vue/require-prop-types': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off'
    }
  }