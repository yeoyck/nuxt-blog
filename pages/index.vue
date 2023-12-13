<template>
  <div class="main-content">
    <ClientOnly>
      <Terminal :welcome="bannerText" :theme="theme" :filesystem="filesystem" :apps="[]" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { type ITheme } from 'xterm'
import Filesystem, { Folder, File } from '~/os/filesystem'
import Color from '~/os/utils/color'
const bannerText = `
The Akar (TA) Not A Corporation. All akars reverved.\n
use "help" to see the available commands
`
const theme: ITheme = {
  foreground: '#E3E3E3',
  background: '#3E3E3E',
  red: '#ff0000'
}
const cheekin: File = new File(
  'cheekin',
  `
    ${Color.Cyan('Name:')} Chee Kin
    ${Color.Cyan('Current position:')} Senior Web Developer
    ${Color.Cyan('Language:')} [Java,typescript]
    ${Color.Cyan('Hobbies:')} [gaming]`
)
const filesystem = new Filesystem([new Folder('user', [cheekin]), new File('README', Color.Cyan('cat') + ' function really works!!!')])
</script>
<style lang="scss" scoped>
.main-content {
  height: 100vh;
}
</style>
