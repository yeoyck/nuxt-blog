import { File } from '../filesystem'
import type { ITerminalFunction } from './ITerminalFunction';

export async function ls({ args, fs, node, stdout }: ITerminalFunction) {
    let path = args[1] || '';
    if (path) {
        try {
            node = fs.node(node, path)!;
        } catch(e) {
            stdout.print(e as string)
            return 
        }
        if (node instanceof File) {
            stdout.print(`file ${node.name}\n`)
        }
    }
    Object.keys(node.children).map(ch => {
        if (node.children[ch] instanceof File) stdout.print(`file  ${ch}\n`)
        else stdout.print(`dir   \x1B[0;36m${ch}\x1B[0m\n`)
    })
    return
}