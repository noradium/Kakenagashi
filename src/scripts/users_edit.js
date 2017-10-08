import qs from 'querystring';
import SessionStorage from "./storage/SessionStorage";

// リダイレクト先の ag.onsen.app:// のリクエストを通して、code を奪い取るために img 要素の src として読み込む。
const image = document.createElement('img');
image.src = 'https://app.onsen.ag/oauth/authorize?client_id=b3d68e56145a5d085f6b0ecc6e1ad4a83345ff4ce97d3e16ace95208ad2f1d2f&redirect_uri=ag.onsen.app%3A%2F%2Foauth2callback&response_type=code&scope=private';
image.addEventListener('error', onImageError);
document.body.appendChild(image);

function onImageError(error) {
  // エラーになった時点で、background.js では code を手に入れているはず
  chrome.runtime.sendMessage({command: 'get_oauth_code'}, (response) => {
    fetch('https://app.onsen.ag/oauth/token', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: qs.stringify({
        'client_id': 'b3d68e56145a5d085f6b0ecc6e1ad4a83345ff4ce97d3e16ace95208ad2f1d2f',
        'client_secret': '291ba633343212ad706abbb4dae8cda6aa96ae53ed6597298121e63db491a089',
        'grant_type': 'authorization_code',
        'code': response.code,
        'redirect_uri': 'ag.onsen.app://oauth2callback'
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return SessionStorage.set('access_token', json['access_token'])
      })
      .then(() => {
        location.href = 'https://app.onsen.ag/top';
      });
  });
}
