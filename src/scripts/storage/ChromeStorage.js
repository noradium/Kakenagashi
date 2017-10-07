export default class ChromeStorage {
  static KEY_PREFIX = 'onsen_web_';

  static set(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({
        [ChromeStorage.KEY_PREFIX + key]: value
      }, () => {
        resolve();
      });
    });
  }

  static get(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(ChromeStorage.KEY_PREFIX + key, (items) => {
        resolve(items[ChromeStorage.KEY_PREFIX + key]);
      });
    });
  }
}
