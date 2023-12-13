import { File, Folder } from '../filesystem'
import Color from '../utils/color'
import type { ICommand, ICommandFunction } from './command'

const ls: ICommand = {
  id: 'ls',
  args: 0,
  usage: 'ls [path ...]',
  description: 'list directories and files',
  async exec({ node, fs, args, stdout }: ICommandFunction) {
    const path = args[0] || ''
    if (path) {
      try {
        node = fs.node(node, path)!
      } catch (e) {
        stdout.print(e as string)
        return
      }
      if (node instanceof File) {
        stdout.print(`file ${node.name}\n`)
      }
    }
    Object.keys(node.children).map((ch) => {
      if (node.children[ch] instanceof File) stdout.print(`file  ${ch}\n`)
      else stdout.print(`dir   ` + Color.Red(ch) + `\n`)
    })
  }
}
export default ls
