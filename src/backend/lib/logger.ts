const LOGGERS: { [key: string]: Log } = {};
export class Log {
    constructor(private name: string) {
    }

    public info(...args: any) {
        this.log("info", args);
    }

    public error(...args: any) {
        this.log("error", args);
    }


    private log(level: "info" | "error", args: []) {
        // TODO timestamps, formatting

        // tslint:disable-next-line
        console.log.apply(null, [level.toUpperCase(), `[${this.name}]`, ...args]);
    }
}

export default {
    getLog: (name: string): Log => {
        if (!LOGGERS[name]) {
            LOGGERS[name] = new Log(name);
        }
        return LOGGERS[name];
    }
};