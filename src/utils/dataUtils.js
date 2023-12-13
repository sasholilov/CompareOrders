function splitStringToArray(string) {
  return string.split(/(\r\n|\r|\n)/g).filter((value) => value.length > 2);
}

export { splitStringToArray };
