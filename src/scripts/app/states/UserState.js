import { observable, computed } from 'mobx';
import OnsenPrivateAPI from "../api/onsen/OnsenPrivateAPI";
import Context from "../Context";

class UserState {
  /**
   * @type {OnsenPrivateAPI}
   */
  _privateAPI;
  /**
   * @type {number[]} favoriteProgramIds
   */
  @observable.shallow favoriteProgramIds = [];
  /**
   * @type {number[]} favoritePerformerIds
   */
  @observable.shallow favoritePerformerIds = [];
  /**
   * @type {object}
   * @property {number} uid
   * @property {string} type
   */
  @observable myInfo;

  @computed get isPremium() {
    return !!this.myInfo && this.myInfo.type === 'paid';
  }

  constructor () {
    this._privateAPI = new OnsenPrivateAPI();
  }

  fetchMyInfo() {
    this._privateAPI.myInfo(Context.oauthAccessToken).then(response => {
      this.myInfo = response;
    });
  }

  fetchFavorites() {
    return this._privateAPI.favorites(Context.oauthAccessToken).then((response) => {
      this.favoriteProgramIds = response.program_ids || [];
      this.favoritePerformerIds = response.performer_ids || [];
    });
  }

  addProgramFavorite(programId) {
    if (!programId) {
      return;
    }
    this._privateAPI.addProgramFavorite(programId, Context.oauthAccessToken).then(response => {
      this.favoriteProgramIds.push(programId);
    });
  }
  deleteProgramFavorite(programId) {
    if (!programId) {
      return;
    }
    this._privateAPI.deleteProgramFavorite(programId, Context.oauthAccessToken).then(response => {
      this.favoriteProgramIds = this.favoriteProgramIds.filter(id => id !== programId);
    });
  }
  addPerformerFavorite(performerId) {
    if (!performerId) {
      return;
    }
    this._privateAPI.addPerformerFavorite(performerId, Context.oauthAccessToken).then(response => {
      this.favoritePerformerIds.push(performerId);
    });
  }
  deletePerformerFavorite(performerId) {
    if (!performerId) {
      return;
    }
    this._privateAPI.deletePerformerFavorite(performerId, Context.oauthAccessToken).then(response => {
      this.favoritePerformerIds = this.favoritePerformerIds.filter(id => id !== performerId);
    });
  }
}

const user = new UserState;
export { user }
