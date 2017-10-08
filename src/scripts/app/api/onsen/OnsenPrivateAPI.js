export default class OnsenPrivateAPI {
  static BASE_URL = 'https://app.onsen.ag/api/me';

  program(programId, accessToken) {
    return this._fetch(`/programs/${programId}`, accessToken)
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

  _fetch(path, accessToken) {
    return fetch(`${OnsenPrivateAPI.BASE_URL}${path}`, {
      headers: new Headers({Authorization: `Bearer ${accessToken}`})
    });
  }
}
