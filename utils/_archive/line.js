
/**
 * This can be used to include the line nunber in a console.log
 * eg console.log(result,line());
 */

var line = () => {
  try {
    throw new Error();
  } catch (error) {
    // console.log( error.stack);
    let stack = error.stack.split(':');
    let line = stack[5];
    // line.forEach((l,i) => {
    //   console.log(i,l);
    // });
    return Number(line)
  }
  return null
}
module.exports = line;