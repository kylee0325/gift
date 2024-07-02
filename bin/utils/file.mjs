import { fs, path } from "zx";

// 递归遍历目录
export function walkDir(dir, callback, parent = "") {
    fs.readdirSync(dir).forEach((item) => {
        let fullPath = path.join(dir, item);

        let stat = fs.lstatSync(fullPath);

        const parentPath = path.join(dir);

        if (stat.isDirectory()) {
            const isContinue = callback({
                fullPath,
                item,
                stat,
                parent: item,
                parentPath,
            });
            if (isContinue !== false) {
                walkDir(fullPath, callback, item); // 递归处理子目录
            }
        } else {
            callback({ fullPath, item, stat, parent, parentPath });
        }
    });
}
