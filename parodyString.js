function parodyString(string) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return string.split('').map((char, index) => {
    if (letters.includes(char)) return index % 2 ? char.toLowerCase() : char.toUpperCase(); else return char;
  }).join('');
}

console.log(parodyString("Hello World!"))

module.exports = parodyString