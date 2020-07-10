import moment from "moment";

export class Util {

  static money(val, def = '空') {
    if (val === null || val === undefined) {
      return `${def}`;
    }
    val = val.toFixed(2);
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static FORMAT_1 = 'YYYY-MM-DD HH:mm:ss';
  static FORMAT_2 = 'YYYY-MM-DD HH:mm';

  static timestampAs(timestamp, format = Util.FORMAT_1, def = 'N/A') {
    if (timestamp === null || timestamp === undefined) {
      return def;
    }
    return moment(timestamp).format(format);
  }

  /**
   * 去重
   * @param array
   * @return {*[]}
   */
  static distinct(array = []) {
    let from = Array.from(new Set(array));
    console.log('form', from);
    return from;
  }
}