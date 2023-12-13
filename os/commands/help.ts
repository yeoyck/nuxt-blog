import { SystemCommands } from '.'
import { getSpacing } from '../utils'
import Color from '../utils/color'
import type { ICommand, ICommandFunction } from './command'

const help: ICommand = {
  id: 'help',
  args: 0,
  usage: 'help',
  description: 'Help function',
  async exec({ stdout }: ICommandFunction) {
    stdout.print('available commands:\n')
    const firstCommandSpacing = SystemCommands[0].id.length + 12
    for (const { id, description } of SystemCommands) {
      if (id === 'help') continue
      stdout.print('\t' + Color.Cyan(id) + getSpacing(firstCommandSpacing - id.length) + description + '\n')
    }
  }
}
export default help
