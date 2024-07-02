import { fileURLToPath } from "node:url";
import { path } from "zx";

/**
 * 
 * @param {*} filePath 
 * @returns 
 */
export function getBasePath(filePath) {
    return path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../../",
        filePath
    );
}

export const getPath = (filePath) => {
    if (path.isAbsolute(filePath)) {
        const cwd = process.cwd();
        return path.normalize(path.join(cwd, filePath));
    }
    return filePath;
};
