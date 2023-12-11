<template>
  <div class="main-content">
    <ClientOnly>
      <Terminal :welcome="bannerText" :theme="theme" :apps="apps" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { type ITheme } from 'xterm'
import { help } from '~/os/utils/help'
const bannerText = `
The Akar (TA) Not A Corporation. All akars reverved.\n
`
const theme: ITheme = {
  foreground: '#E3E3E3',
  background: '#3E3E3E',
  red: '#ff0000'
}
const apps: Record<string, Function> = {
  help
}
</script>
<style lang="scss" scoped>
.main-content {
  height: 100vh;
}
</style>
