import Color from '../utils/color'
import type { ICommand, ICommandFunction } from './command'
const LAST_UPDATE = '2023-12-12'

const whoami: ICommand = {
  id: 'whoami',
  args: 0,
  description: 'display sloth developer info',
  usage: 'whoami',
  async exec({ stdout }: ICommandFunction) {
    stdout.print(`
    ${Color.Cyan('Name:')} Chee Kin
    ${Color.Cyan('Current position:')} Senior Web Developer
    ${Color.Cyan('Language:')} [Java,typescript]
    ${Color.Cyan('Hobbies:')} [gaming]
    ${Color.Cyan('Last update:')} ${LAST_UPDATE}
    `)
  }
}
export default whoami
