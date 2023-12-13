import type { ICommand } from './command'
import help from './help'
import cat from './cat'
import ls from './ls'
import whoami from './whoami'

export const SystemCommands: ICommand[] = [ls, cat, whoami, help]
