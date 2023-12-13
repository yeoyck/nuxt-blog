export interface ICommand {
  id: string
  args: number
  description: string
  usage: string
  exec: (args: ICommandFunction) => void
}
export interface ICommandFunction {
  args: string[]
  fs: Filesystem
  node: INode
  stdout: StdOut
}
