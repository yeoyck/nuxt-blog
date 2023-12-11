import type { ITerminalFunction } from './ITerminalFunction'
import Color from './color'

export async function help({ args, fs, node, stdout }: ITerminalFunction) {
    stdout.print('Common Command:\n')
    stdout.print(Color.Cyan('cd') + ': Change directory\n')
    stdout.print(Color.Cyan('ls') + ': List Directory\n')
    stdout.print(Color.Cyan('cat') + ': View File\n')
    return
}