import {
    walkDir,
    getDirectorySize,
    getFileSize,
    arrayToTree,
    formatTree,
} from "../utils/index.mjs";

export function getSizeInfo(dir) {
    const fileSizeInfo = [];

    walkDir(dir, ({ fullPath, item, stat, parent, parentPath }) => {
        if (stat.isDirectory()) {
            const fileSize = getDirectorySize(fullPath);

            fileSizeInfo.push({
                id: fullPath,
                name: item,
                size: getFileSize(fileSize),
                path: fullPath,
                parent_id: parentPath,
            });
        }
    });

    const tree = arrayToTree(fileSizeInfo, path.join(dir));

    return formatTree(tree, (item) => ({
        name: item.name,
        size: item.size,
    }));
}
