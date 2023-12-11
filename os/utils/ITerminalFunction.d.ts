export interface ITerminalFunction {
    args: string[],
    fs: Filesystem,
    node: INode,
    stdout: StdOut
}