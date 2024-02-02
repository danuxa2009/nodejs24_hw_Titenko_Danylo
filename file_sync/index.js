
const { readdir, mkdir, access, copyFile } = require('fs/promises');
const path = require('path');
const logger = require('../utils/logger')('fileSync');
const SOURCE_DIR = '../source'
const TARGET_DIR = '../target'



const copyDirectoryWithEntries = async (sourcePath, targetPath) => {
    await mkdir(targetPath, { recursive: true });
    await copyFiles(sourcePath, targetPath);
}

const copyEntry = async (sourcePath, targetPath) => {
    try {
        await access(targetPath);
        logger.warn(`File "${targetPath}" already exists`);
    } catch (error) {
        await copyFile(sourcePath, targetPath)
        logger.info(`File "${sourcePath}" has been copied successfully`);
    }
}


const copyFiles = async (sourceDir, targetDir) => {
    const entryList = await readdir(sourceDir, { withFileTypes: true });

    entryList.forEach(async (entry) => {
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        entry.isDirectory() ?
            await copyDirectoryWithEntries(sourcePath, targetPath) :
            await copyEntry(sourcePath, targetPath)

    })
}

const start = () => {
    const sourceDir = path.resolve(__dirname, SOURCE_DIR);
    const targetDir = path.resolve(__dirname, TARGET_DIR);

    copyFiles(sourceDir, targetDir);
}


module.exports = {
    start
}
