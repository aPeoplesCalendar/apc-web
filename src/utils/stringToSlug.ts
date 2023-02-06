export const stringToSlug = (str: string) => {
  // credit to https://gist.github.com/codeguy/6684588
  let newStr = str;
  newStr = newStr.replace(/^\s+|\s+$/g, ""); // trim
  newStr = newStr.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôōùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiiooooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    newStr = newStr.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  newStr = newStr
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return newStr;
};
