import { fs, path } from "zx";

export function getDirectorySize(directory) {
    let size = 0;

    function getSizeRecursively(directory) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const currentPath = path.join(directory, file);
            const stats = fs.statSync(currentPath);
            if (stats.isFile()) {
                size += stats.size;
            } else if (stats.isDirectory()) {
                getSizeRecursively(currentPath);
            }
        });
    }

    getSizeRecursively(directory);

    return size;
}

export const getFileSize = (size) => {
    // 初始化文件大小为字节
    const fileSizeInBytes = size;

    // 转换为KB
    const fileSizeInKB = fileSizeInBytes / 1024;

    // 转换为MB
    const fileSizeInMB = fileSizeInKB / 1024;

    // 转换为GB
    const fileSizeInGB = fileSizeInMB / 1024;

    let displaySize = fileSizeInBytes.toFixed(0) + "B";

    // 默认显示单位为KB
    if (fileSizeInKB > 1) {
        displaySize = fileSizeInKB.toFixed(0) + "KB";
    }

    // 如果文件大于1MB，显示单位为MB
    if (fileSizeInMB > 1) {
        displaySize = fileSizeInMB.toFixed(1) + "MB";
    }

    // 如果文件大于1GB，显示单位为GB
    if (fileSizeInGB > 1) {
        displaySize = fileSizeInGB.toFixed(1) + "GB";
    }

    return displaySize;
};
