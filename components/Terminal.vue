<template>
  <div ref="root"></div>
</template>

<script setup lang="ts">
import { Terminal, type ITheme } from 'xterm'
import { FitAddon } from '@xterm/addon-fit'
// import { LigaturesAddon } from '@xterm/addon-ligatures'
import StdOut from '@/os/stdout'
import Shell from '@/os/shell'
import Filesystem from '~/os/filesystem'
import { Folder, File } from '~/os/filesystem'
const props = defineProps<{ welcome: string; theme: ITheme; apps: Record<string, Function> }>()

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

const stdout = new StdOut(terminal)
const filesystem: Filesystem = new Filesystem([
  new Folder('home', [new Folder('user', [new File('cheekin', 'yeoyck@outlook.com')]), new Folder('root', [])]),
  new Folder('bin', []),
  new Folder('lib', []),
  new File('README', 'It works!')
])

const shell = new Shell(terminal, filesystem, stdout, props.apps)

onMounted(() => {
  terminal.open(root.value!)
  // const ligaturesAddon = new LigaturesAddon()
  // terminal.loadAddon(ligaturesAddon)
  terminal.loadAddon(fitAddon)
  fitAddon.fit()

  stdout.print('')
  // stdout.print(props.welcome.replace(/\n/g, '\n\r'))
  stdout.print(props.welcome)
  stdout.print('')
  shell.user = 'guest'
  shell.domain = 'theakar.link'
  shell.run()
})
</script>

<style lang="scss">
// bug for fullscreen
.xterm-viewport {
  height: 100vh;
}
.xterm-viewport::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.xterm-viewport {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
