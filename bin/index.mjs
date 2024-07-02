#!/usr/bin/env node
import "zx/globals";
import { argv } from "zx";

import {
    getPackageInfo,
    logger,
    getNextArg,
    getPath,
    getArgvValue,
} from "./utils/index.mjs";
import { printUsage, clean, getSizeInfo } from "./scripts/index.mjs";

chalk.level = 1;

$.verbose = false;

const COMMAND = {
    CLEAN: "clean",
    SIZE: "size",
};

await (async function main() {
    // logger.log("argv", argv);

    // 获取版本信息
    if (argv.v || argv.V || argv.version) {
        const version = getPackageInfo().version;
        console.log(version);
        return;
    }

    // 获取帮助信息
    if (argv.h || argv.help) {
        printUsage();
        return;
    }

    if (argv._.includes(COMMAND.CLEAN)) {
        let cleanDir = getNextArg(COMMAND.CLEAN);

        if (!cleanDir) {
            cleanDir = await getArgvValue("要清除的目录");
        }

        const cleanDirPath = getPath(cleanDir);

        let files = argv.f || argv.files;

        if (!files) {
            files = await getArgvValue("要清除的目录名称");
        }

        if (cleanDirPath && files) {
            clean(cleanDirPath, files.split(","));
            return;
        }

        logger.errorExit(`信息不全`);

        return;
    }

    if (argv._.includes(COMMAND.SIZE)) {
        let sizeDir = getNextArg(COMMAND.SIZE);

        if (!sizeDir) {
            sizeDir = await getArgvValue("目录");
        }

        const sizeDirPath = getPath(sizeDir);

        const sizeInfo = getSizeInfo(sizeDirPath);

        logger.success(JSON.stringify(sizeInfo, null, 4));
        return;
    }

    // 输出帮助信息
    printUsage();
})().catch((err) => {
    console.error(err);
});
