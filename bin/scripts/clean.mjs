import { $ } from "zx";

import { walkDir } from "../utils/index.mjs";

export function clean(dir, files = []) {
    walkDir(dir, ({ fullPath, item, stat }) => {
        if (files.some((file) => file === fullPath || file === item)) {
            $.sync`rm -rf "${fullPath}"`;

            // 如果是目录，删除后应返回false，避免后续遍历异常
            if (stat.isDirectory()) return false;
        }
    });
}
