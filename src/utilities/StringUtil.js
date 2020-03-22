export default class StringUtil {
  /**
   * Splits a string in half by a separator
   *
   * @param str string
   * @param separator string
   * @example
   *    splitBySeparator('https://api.tvmaze.com/search/shows?q=Friends', '.com');
   *
   *    // ['https://api.tvmaze.com', '/search/shows?q=Friends']
   */
  static splitBySeparator = (str, separator) => {
    return str.split(new RegExp(`(.*?${separator})`, 'g')).filter(Boolean);
  };
}
