function parodyString(string) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return string.split('').map((char, index) => {
    if (letters.includes(char)) return index % 2 ? char.toLowerCase() : char.toUpperCase(); else return char;
  }).join('');
}

module.exports = parodyString