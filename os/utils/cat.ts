import { Folder, File } from '../filesystem'
import type { ITerminalFunction } from './ITerminalFunction';

export async function cat({ args, fs, node, stdout }: ITerminalFunction) {
    if (args.length < 2) {
        stdout.print('cat: No file specified.\n')
    }
    try {
        node = fs.node(node, args[1])
    } catch(e) {
        stdout.print(`cat: ${args[1]}: No such file or directory\n`)
        return
    }
    if (node instanceof Folder) {
        stdout.print(`cat: ${args[1]}: Is a directory\n`)
    }
    stdout.print((node as File).content + '\n');
    return
}