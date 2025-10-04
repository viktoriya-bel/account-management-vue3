export const crypt = (inputString: string, secret: string): string => {
  let outputString = '';
  for (let i = 0; i < inputString.length; i++) {
    outputString += String.fromCharCode(
      inputString.charCodeAt(i) ^ secret.charCodeAt(i % secret.length),
    );
  }
  return outputString;
};
