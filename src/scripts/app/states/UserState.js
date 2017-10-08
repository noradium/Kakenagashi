import { observable, computed } from 'mobx';
import OnsenPrivateAPI from "../api/onsen/OnsenPrivateAPI";
import Context from "../Context";

class UserState {
  /**
   * @type {OnsenPrivateAPI}
   */
  _privateAPI;
  /**
   * @type {object}
   * @property {number[]} program_ids
   * @property {number[]} performer_ids
   */
  @observable favorites;

  constructor () {
    this._privateAPI = new OnsenPrivateAPI();
  }

  fetchFavorites() {
    return this._privateAPI.favorites(Context.oauthAccessToken).then((response) => {
      this.favorites = response;
    });
  }
}

const user = new UserState;
export { user }
