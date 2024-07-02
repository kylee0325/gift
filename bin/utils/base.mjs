import { fs } from "zx";

import { getBasePath } from "./path.mjs";

const { readJsonSync } = fs;

export function getPackageInfo() {
    return readJsonSync(getBasePath("package.json"));
}
