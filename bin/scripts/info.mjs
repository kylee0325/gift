import { getPackageInfo } from "../utils/index.mjs";

export function printUsage() {
    const pkgName = getPackageInfo().name;
    const version = getPackageInfo().version;

    console.log(`
${chalk.yellow(`[${pkgName}]: `)} ${chalk.bold(version)}

${chalk.bold("Description")}
    some common node scripts.

${chalk.bold("Usage")}
    gift [options]

${chalk.bold("Options")}
    clean [directory] -f [files]     clean directories or files
    size [directory]                 get directory size
    --version, -v                    print current version
    --help, -h                       print help
`);
}
