import { chalk } from "zx";

import { getPackageInfo } from "./base.mjs";

class Logger {
    constructor(namespace) {
        this.namespace = namespace;
    }
    namespace;
    show = true;
    info(str) {
        return this.log(chalk.cyan(str));
    }
    warn(str) {
        return this.log(chalk.bold.yellow(str));
    }
    error(str) {
        return this.log(chalk.bold.red(str));
    }
    errorExit(str) {
        this.log(chalk.bold.red(str));
        process.exit(0);
    }
    success(str) {
        return this.log(chalk.green(str));
    }
    tip(str) {
        return this.log(chalk.blueBright(str));
    }
    log() {
        if (this.show) {
            console.log(chalk.yellow(`[${this.namespace}]: `), ...arguments);
        }
    }
    hideLog() {
        this.show = false;
    }
    showLog() {
        this.show = true;
    }
}

export const logger = new Logger(getPackageInfo().name);

export default Logger;
