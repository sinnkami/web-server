const args = require('yargs')
    .option('compression', {
        boolean: true,
        default: false,
        describe: '圧縮ファイルに変換するかどうか',
    })
    .option('watch', {
        boolean: true,
        default: false,
        describe: '永続化するか',
    })
    .option('vendor', {
        string: true,
        default: 'express',
        describe: 'どの形式で出力するか',
        choices: ['express', 'electron'],
    }).argv;

const value = {
    dest: `dist/`,
    src: 'app',
    watch: args.watch,
    vendor: args.vendor,
    sourcemaps: args.sourcemaps,
    compression: args.compression,
};

module.exports = value;
