// noob implementation (obfuscating not encrypting)
export const encrypt = (value: string) => {
  let res = [];
  for (const char of value) {
    res.push(char.charCodeAt(0) * 23);
  }
  return res.join(",");
};

export const decrypt = (value: string) => {
  let res = "";
  for (const char of value.split(",")) {
    res += String.fromCharCode(parseInt(char) / 23);
  }
  return res;
};
