function compress(string) {
  var currentChar;
  var currentCharCount;
  var resultString = '';
  for (var i = 0; i <= string.length; i++) {
    if (currentChar !== string[i]) {
      if (i > 0) {
        resultString += currentChar + currentCharCount;
      }
      currentChar = string[i];
      currentCharCount = 1;
    } else {
      currentCharCount++;
    }
  }
  return resultString;
}