/**
 * see https://nodejs.org/api/child_process.html
 */

const {exec} = require('child_process');
const compiler = {};
function compile() {
   exec('npm run wafflebuild');
}
compiler.compile = compile;

module.exports = compiler;

