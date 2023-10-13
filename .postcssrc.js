module.exports = () => {
  return {
    plugins: [require('postcss-prefixwrap')(`.app-teleprompter`)],
  }
}
