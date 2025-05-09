function palindromeArray(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    if (array[i] !== array[array.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

module.exports = palindromeArray