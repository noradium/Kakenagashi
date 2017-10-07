/**
 * アプリケーションの起動中変わらない値を入れておくグローバルなオブジェクト
 */
export default class Context {
  /**
   * @type {string}
   * @private
   */
  static _oauthAccessToken;

  /**
   * 初期化メソッド
   * @param {object} context
   * @param {string} context.oauthAccessToken
   */
  static init(context) {
    this._oauthAccessToken = context.oauthAccessToken;
  }

  /**
   * app.onsen.ag のAPIアクセストークン
   * @return {string}
   */
  static get oauthAccessToken() {
    return this._oauthAccessToken;
  }
}
