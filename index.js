/**
 * Copyright © 2020 snomiao@gmail.com
 */

const { exec, execFile, execSync } = require('child_process');
const { fstat } = require('fs');
const { promisify } = require('util');

if (!module.parent) main().then(console.log).catch(console.error);

async function main() {
    await promisify(exec)(`chcp 65001`);
    // READING PARAMS
    const argv = require('yargs')
        .usage('Usage: npx junction-move from_folder to_folder')
        .example('junction-move C:\\Go D:\\Go')
        .example('npx junction-move C:\\Go D:\\Go')
        .help('h').alias('h', 'help')
        .epilog('Copyright (c) 2020 snomiao@gmail.com')
        .argv;

    if (argv._.length !== 2) {
        console.log('Expected 2 arguments but got ', argv._.length, ", you can use -h to learn why.")
        return 'FAIL'
    }

    const [from, to] = argv._
    try { execSync(`robocopy "${from}" "${to}" /MOVE /e `, { stdio: 'inherit' }) } catch (e) { }
    try { execSync(`mklink /J "${from}" "${to}"`, { stdio: 'inherit' }) } catch (e) { }
    return 'done';
}
module.exports = main
