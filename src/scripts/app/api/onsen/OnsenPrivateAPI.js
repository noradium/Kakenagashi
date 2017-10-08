export default class OnsenPrivateAPI {
  static BASE_URL = 'https://app.onsen.ag/api/me';

  program(programId, accessToken) {
    return this._fetch(`/programs/${programId}`, accessToken)
      .then((response) => {
        return response.json();
      });
  }

  myInfo(accessToken) {
    return this._fetch('', accessToken)
      .then((response) => {
        return response.json();
      });
  }

  favorites(accessToken) {
    return this._fetch('/favorites/ids', accessToken)
      .then((response) => {
        return response.json();
      });
  }

  addProgramFavorite(programId, accessToken) {
    return this._fetch(`/programs/${programId}/favorite`, accessToken, {method: 'PUT'})
      .then((response) => {
        return response.json();
      });
  }
  deleteProgramFavorite(programId, accessToken) {
    return this._fetch(`/programs/${programId}/favorite`, accessToken, {method: 'DELETE'});
  }
  addPerformerFavorite(performerId, accessToken) {
    return this._fetch(`/performers/${performerId}/favorite`, accessToken, {method: 'PUT'})
      .then((response) => {
        return response.json();
      });
  }
  deletePerformerFavorite(performerId, accessToken) {
    return this._fetch(`/performers/${performerId}/favorite`, accessToken, {method: 'DELETE'});
  }

  _fetch(path, accessToken, options = {}) {
    options.headers = new Headers({Authorization: `Bearer ${accessToken}`});
    return fetch(`${OnsenPrivateAPI.BASE_URL}${path}`, options);
  }
}
