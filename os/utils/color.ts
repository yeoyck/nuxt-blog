export default class Color {
    static Red(str: string):string {
        return '\x1B[0;31m' + str + '\x1B[0m';
    }
    static Green(str: string):string {
        return '\x1B[0;32m' + str + '\x1B[0m';
    }
    static Blue(str: string):string {
        return '\x1B[0;34m' + str + '\x1B[0m';
    }
    static Purple(str: string):string {
        return '\x1B[0;35m' + str + '\x1B[0m';
    }
    static Cyan(str: string):string {
        return '\x1B[0;36m' + str + '\x1B[0m';
    }
}