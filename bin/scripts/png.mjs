import { fs, path } from "zx";
import sharp from "sharp";

import { walkDir, logger } from "../utils/index.mjs";

const compressPng = (file, quality) => {
    const { name } = path.parse(file);

    const ext = path.extname(file).replace(".", "");

    const formats = [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "webp",
        "svg",
        "avif",
        "tiff",
    ];

    if (!formats.includes(ext)) {
        logger.error(`不支持的文件格式，已跳过文件：${file}`);
        return;
    }

    fs.ensureDirSync(file.replace(`${name}.${ext}`, `compressed`));

    fs.readFile(file, (err, data) => {
        if (err) throw err;

        const outputFile = file.replace(
            `${name}.${ext}`,
            `compressed/${name}_${quality}.${ext}`
        );

        const action = ext === "jpg" ? "jpeg" : ext;

        // 压缩图片质量
        sharp(data)
            [action]({ quality })
            .toFile(outputFile, (err) => {
                if (err) throw err;
                console.log(`压缩完成，文件保存为${outputFile}`);
            });
    });
};

export function compressPngList(pngDirPath, quality) {
    if (quality > 100 || quality < 0) {
        logger.errorExit("quality must be between 0 and 100");
    }

    let pngStat = fs.lstatSync(pngDirPath);

    if (pngStat.isDirectory()) {
        walkDir(pngDirPath, ({ fullPath, item, stat }) => {
            if (stat.isFile()) {
                compressPng(fullPath, quality);
            }
        });
    } else {
        compressPng(pngDirPath, quality);
    }
}
