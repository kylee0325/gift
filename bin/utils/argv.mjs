import { argv, question } from "zx";

import { logger } from "./logger.mjs";

export function getNextArg(arg) {
    const index = argv._.findIndex((item) => item === arg);

    return argv._[index + 1];
}

export async function getArgvValue(label) {
    let res = await question(`请输入${label}: `);

    res = res.trim();

    if (!res) {
        logger.errorExit(`${label}不可为空`);
    }
    return res;
}
