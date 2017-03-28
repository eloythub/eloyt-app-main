export default class Utils {
  static next() {
    return this.wait(0);
  }

  static wait(time) {
    return new Promise(async(fulfill) => {
      setTimeout(fulfill, time);
    });
  }
}
