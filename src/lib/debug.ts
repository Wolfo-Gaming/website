class Logger {
    logPrefix = "";
    beatiful = true;
    level: any;
    constructor(logPrefix: any, beatiful: any) {
        this.beatiful =  beatiful ?? true;
        this.logPrefix = logPrefix
    }
    send(level: any, text: any) {
        if (level < this.level) {
            return;
        }
    
        var fn = console.log;
        if (console.error && (level == "ERROR" || level == "FATAL")) {
            fn = console.error;
        }
        if (console.warn && level == "WARN") {
            fn = console.warn;
        }
        if (console.info && level == "INFO") {
            fn = console.info;
        }
        if (console.debug && level == "DEBUG") {
            fn = console.debug;
        }
        if (true) {
            var str = '%c' + this.logPrefix + '%c' + level;
            str += '%c %c' + text;
            //@ts-expect-error
            var levelColor = {
                DEBUG: '#454F5B; color: white;',
                INFO: '#007ACE; color: white;',
                WARN: '#EEC200; color: white;',
                ERROR: '#BF0711; color: white;',
                FATAL: 'linear-gradient(to top, #EEC200 0, #BF0711 100%); color: white;'
            }[level];
            var styles = ['background: #202E78; border-top-left-radius: 4px; border-bottom-left-radius: 4px; padding: 0 8px;color: white', 'width: 55px; text-align: center; padding: 0 8px; border-bottom-right-radius: 4px; border-top-right-radius: 4px;background:' + levelColor, 'padding: 0 2px;'];
    
            fn.bind(console).apply(undefined, [str].concat(styles));
        } 
    }
    error(data: any) {
        this.send("ERROR", data)
    }
    fatal(data: any) {
        this.send("FATAL", data)
    }
    info(data: any) {
        this.send("INFO", data)
    }
    warn(data: any) {
        this.send("WARN", data)
    }
    debug(data: any) {
        this.send("DEBUG", data)
    }
}

var logger = new Logger("Website", true);
export const debug = {
    log: (args: any) => {
        if (process.env.NODE_ENV == "development") {
            logger.info(args)
        }
    },
    error: (args: any) => {
        if (process.env.NODE_ENV == "development") {
            logger.error(args)
        }
    }
}