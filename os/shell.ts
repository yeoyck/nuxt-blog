import { Terminal, type IBuffer } from 'xterm'
import Filesystem, { Folder, File } from './filesystem'
import StdOut from './stdout'
import Color from './utils/color'
import { SystemCommands } from './commands'
import type { ICommand } from './commands/command'

export default class Shell {
  user: string = ''
  domain: string = 'nuxt-terminal'

  private buffer: string = ''
  private hbuffer: string[] = []
  private HistorySize: number = 10
  private cposition: number = this.hbuffer.length

  private folder: Folder

  constructor(
    private term: Terminal,
    private fs: Filesystem,
    private stdout: StdOut,
    private apps: ICommand[]
  ) {
    term.onKey(({ key, domEvent }) => this.onKey(key, domEvent))
    this.folder = fs.root
    this.apps = [...SystemCommands, ...apps]
  }

  private get head(): string {
    return Color.Cyan((this.user && this.user.length ? this.user + '@' : '') + this.domain) + Color.Red(this.folder.path) + '$ '
  }

  private resetBuffer(): void {
    let i = 0
    while (i < this.buffer.length) {
      this.stdout.print('\b \b')
      i++
    }
  }

  private addHbuffer(): void {
    if (this.buffer.length > 0 && this.hbuffer.at(-1) === this.buffer) {
      return
    }
    this.hbuffer.push(this.buffer)
    this.cposition++
    if (this.hbuffer.length > this.HistorySize) {
      this.hbuffer.shift()
      this.cposition = this.HistorySize - 1
    }
  }

  private async onKey(key: string, domEvent: KeyboardEvent) {
    const code = key.charCodeAt(0)
    switch (domEvent.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        console.log(this.hbuffer)
        if (this.hbuffer.length === 0) {
          return
        }
        if (domEvent.key === 'ArrowDown') {
          if (this.cposition === this.hbuffer.length) return
          this.cposition = Math.min(this.hbuffer.length, this.cposition + 1)
        } else {
          this.cposition = Math.max(0, this.cposition - 1)
        }
        this.resetBuffer()
        console.log(this.cposition)
        if (this.cposition === this.hbuffer.length) {
          this.buffer = ''
        } else {
          this.buffer = this.hbuffer[this.cposition]
        }
        this.stdout.print(this.buffer)
        break
      }
      case 'l': {
        if (domEvent.ctrlKey) {
          this.buffer = ''
          await this.term.reset()
          return this.run()
        }
        break
      }
      case 'Backspace': {
        await this.handleBackspace()
        return
      }
      case 'Enter': {
        return this.run()
      }
    }
    if (code < 32) return

    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey
    if (printable) {
      this.stdout.print(key)
      this.buffer += key
    }
  }
  async handleBackspace() {
    if (this.buffer.length === 0) return
    if (this.term.buffer.normal.cursorX === 0) {
      this.stdout.print('\x1B[A')
      this.stdout.print('\x1B[' + this.term.cols + 'G')
      this.stdout.print(' ')
    } else {
      this.stdout.print('\b \b')
    }
    this.buffer = this.buffer.substring(0, this.buffer.length - 1)
    return
  }

  async run(cmd?: string) {
    const buffer = cmd || this.buffer.trim()
    if (buffer.length === 0) {
      this.prompt()
      return
    }
    try {
      const [input, ...args] = buffer.split(/\s+/)
      await this.exec(input, args)
    } catch (e) {
      // @ts-ignore
      this.printError(e.message)
    }
    this.addHbuffer()
    this.buffer = ''
    this.prompt()
    return
  }
  async exec(input: string, args: string[]) {
    const command = this.apps.find((c) => c.id === input)
    if (input === 'cd') {
      return this.cd(args[0])
    }
    if (!command) {
      throw new Error('Command not found. Type "help" to list available commands')
    }
    if (command.args === 0 && args.length > 0) {
      throw new Error(`${command.id} does not accept arguments`)
    }
    if ((command.args === -1 && args.length === 0) || (command.args !== -1 && command.args !== args.length)) {
      throw new Error(`not enough arguments\r\n usage: ${command.usage}`)
    }
    this.stdout.print('\n')
    await command.exec({
      args,
      fs: this.fs,
      node: this.folder,
      stdout: this.stdout
    })
    return null
  }

  prompt() {
    this.stdout.print('\n' + this.head)
  }

  printError(message: string) {
    return this.stdout.print('\n' + Color.Red(message))
  }

  /**
   * Moves to a folder node by path
   * @param local Current local inode (for relative addresses)
   * @param path  UNIX path
   * @param print Print method callback
   */
  cd(path: string): void {
    if (!path) return
    let node = null
    try {
      node = this.fs.node(this.folder, path)!
    } catch (e) {
      return this.stdout.print(e as string)
    }
    if (node instanceof File) {
      return this.stdout.print(`cd: '${node.name}': Not a directory\n`)
    }
    this.folder = node
  }
}
