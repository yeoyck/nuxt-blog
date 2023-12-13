<template>
  <div id="root" ref="root"></div>
</template>

<script setup lang="ts">
import { Terminal, type ITheme } from 'xterm'
import { FitAddon } from '@xterm/addon-fit'
import StdOut from '@/os/stdout'
import Shell from '@/os/shell'
import Filesystem from '~/os/filesystem'
import type { ICommand } from '~/os/commands/command'
const props = defineProps<{ welcome: string; theme: ITheme; filesystem: Filesystem; apps: ICommand[] }>()
const root = ref<HTMLDivElement>()

const terminal = new Terminal({
  fontFamily: 'Cascadia Code',
  fontWeight: '300',
  fontSize: 14,
  cursorBlink: true,
  allowProposedApi: true,
  theme: props.theme
})
const fitAddon = new FitAddon()
useResizeObserver(root, () => {
  fitAddon.fit()
})
const stdout = new StdOut(terminal)
const filesystem: Filesystem = props.filesystem
const shell = new Shell(terminal, filesystem, stdout, props.apps)
// watch(
//   () => height.value,
//   (height) => {
//     fitAddon.fit()
//     const dimension = fitAddon.proposeDimensions()
//     if (dimension) {
//       console.log({ rows: dimension.rows })
//       terminal.resize(dimension.cols, Math.floor(height / (12 + 2)))
//     }
//   }
// )
onMounted(() => {
  terminal.open(root.value!)
  terminal.loadAddon(fitAddon)
  fitAddon.fit()

  stdout.print('')
  stdout.print(props.welcome)
  stdout.print('')
  shell.user = 'guest'
  shell.domain = 'theakar.link'
  shell.run('help')
})
</script>

<style lang="scss">
#root {
  height: 100dvh;
  width: 100dvw;
}
// bug for fullscreen
.xterm *::-webkit-scrollbar {
  display: none;
  position: relative;
}
.xterm * {
  scrollbar-width: none;
}
.terminal.xterm {
  height: 100%;
}
.xterm-viewport {
  height: 100% !important;
}
</style>
