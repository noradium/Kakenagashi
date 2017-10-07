export default class OnsenPublicAPI {
  static BASE_URL = 'https://app.onsen.ag/api';

  programs() {
    return fetch(`${OnsenPublicAPI.BASE_URL}/programs`)
      .then((response) => {
        return response.json();
      });
  }
}
