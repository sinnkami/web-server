const requireDir = require('require-dir');
class Tasks {
    constructor() {
        this.jobs = requireDir('./tasks');
    }
}
module.exports = new Tasks();
