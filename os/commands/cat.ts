import { File, Folder } from '../filesystem'
import type { ICommand, ICommandFunction } from './command'

const cat: ICommand = {
  id: 'cat',
  args: -1,
  usage: 'cat [file ...]',
  description: 'print file',
  async exec({ node, fs, args, stdout }: ICommandFunction) {
    try {
      node = fs.node(node, args[0])
    } catch (e) {
      stdout.print(`cat: ${args[0]}: No such file or directory\n`)
      return
    }
    if (node instanceof Folder) {
      stdout.print(`cat: ${args[0]}: Is a directory\n`)
    }
    stdout.print((node as File).content + '\n')
  }
}
export default cat
