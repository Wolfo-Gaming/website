export const debug = {
    log: (...args: any[]) => {
        if (process.env.NODE_ENV == "development") {
            console.log(...args);
        }
    },
    error: (...args: any[]) => {
        if (process.env.NODE_ENV == "development") {
            console.error(...args);
        }
    }
}