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
    }).argv;

const value = {
    dest: `dist/`,
    src: 'app',
    watch: args.watch,
    sourcemaps: args.sourcemaps,
    compression: args.compression,
};

module.exports = value;
