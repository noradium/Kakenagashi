export default class SessionStorage {
  static KEY_PREFIX = 'onsen-ex_';

  static set(key, value) {
    window.sessionStorage.setItem(SessionStorage.KEY_PREFIX + key, value);
  }

  static get(key) {
    return window.sessionStorage.getItem(SessionStorage.KEY_PREFIX + key);
  }

  static delete(key) {
    window.sessionStorage.removeItem(SessionStorage.KEY_PREFIX + key);
  }
}
